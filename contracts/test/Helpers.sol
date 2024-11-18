pragma solidity ^0.8.0;

//TEST
import "forge-std/Test.sol";
import "./HintHelpers.sol";

//BOLD
import {BorrowerOperations} from "liquity-bold/src/BorrowerOperations.sol";
import {ERC20} from "liquity-bold/lib/Solady/src/tokens/ERC20.sol";
//UNIV4
import {Hooks} from "v4-core/src/libraries/Hooks.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {CurrencyLibrary, Currency} from "v4-core/src/types/Currency.sol";
import {Actions} from "v4-periphery/src/libraries/Actions.sol";
import {LiquidityAmounts} from "v4-core/test/utils/LiquidityAmounts.sol";
import {TickMath} from "v4-core/src/libraries/TickMath.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {SortTokens, MockERC20} from "v4-core/test/utils/SortTokens.sol";
import {IAllowanceTransfer} from "permit2/src/interfaces/IAllowanceTransfer.sol";
import {PositionManager} from "v4-periphery/src/PositionManager.sol";
import {PoolSwapTest} from "v4-core/src/test/PoolSwapTest.sol";
import {IQuoter} from "v4-periphery/src/interfaces/IQuoter.sol";
//HOOK
import {Hook} from "../src/Hook.sol";
import {ILuniHook} from "../src/interfaces/ILuniHook.sol";

contract Helpers is HintHelpers, Test {

    //BOLD///////////////////////////////////////////////////////////////////////////////////////
    address public constant BOLD = 0x3EF4A137b3470f0B8fFe6391eDb72d78a3Ac1E63;
    address public constant WETH = 0xbCDdC15adbe087A75526C0b7273Fcdd27bE9dD18;
    
    address public constant USER = 0x5C89102bcBf5Fa85f9aec152b0a3Ef89634DEcB5;
    uint256 public constant AMOUNT_COLLATERAL = 1000000000000000000000000;
    uint256 public constant AMOUNT_BOLD = 1000000000000000000000000000;

    address public constant BORROWER_OPERATIONS = 0x8fF7d450FA8Af49e386d162D80295606ef881a16;

    //UNIV4////////////////////////////////////////////////////////////////////////////////////
    
    /// @dev populated with default sepolia addresses from: https://docs.uniswap.org/contracts/v4/deployments
    IPoolManager POOLMANAGER = IPoolManager(address(0x8C4BcBE6b9eF47855f97E675296FA3F6fafa5F1A));
    PositionManager posm = PositionManager(payable(address(0x1B1C77B606d13b09C84d1c7394B96b147bC03147)));
    IAllowanceTransfer PERMIT2 = IAllowanceTransfer(address(0x000000000022D473030F116dDEE9F6B43aC78BA3));
    // PoolSwapTest Contract address, default to the anvil address
    PoolSwapTest swapRouter = PoolSwapTest(0xe49d2815C231826caB58017e214Bed19fE1c2dD4);
    IQuoter QUOTER = IQuoter(0xCd8716395D55aD17496448a4b2C42557001e9743);
    using CurrencyLibrary for Currency;
    Currency public currency0;
    Currency public currency1;
    PoolKey pool;
    /////////////////////////////////////
    // --- Parameters to Configure --- //
    /////////////////////////////////////

    // --- pool configuration --- //
    // fees paid by swappers that accrue to liquidity providers
    uint24 lpFee = 3000; // 0.30%
    int24 tickSpacing = 60;

    ///@dev
    /* 
    // If BOLD is token0 and WETH is token1:
    // price = 1/2000 (because we want token1/token0)
    // sqrt(1/2000) * 2^96 = 1771845812700853221

    // If WETH is token0 and BOLD is token1:
    // price = 2000 (because we want token1/token0)
    // sqrt(2000) * 2^96 = 79228162514264337593543950336
    
    uint160 startingPrice = BOLD < WETH ? 
        1771845812700853221 :      // If BOLD is token0: sqrt(1/2000) * 2^96
        79228162514264337593543950336;  // If WETH is token0: sqrt(2000) * 2^96
    */

    // starting price of the pool, in sqrtPriceX96
    uint160 startingPrice = 1771845812700853221; // floor(sqrt(1) * 2^96)

    // --- liquidity position configuration --- //
    uint256 public token0Amount = 10e18;
    uint256 public token1Amount = 10e18*2000;

    // range of the position
    int24 tickLower = -600; // must be a multiple of tickSpacing
    int24 tickUpper = 600;
    /////////////////////////////////////


    //HOOK/////////////////////////////////////////////////////////////////////////////////////
    Hook public hookContract;

    function calculateUpfrontFee(uint256 _collIndex, uint256 _borrowedAmount, uint256 _interestRate) public view returns (uint256) {
        
        ITroveManager troveManager = collateralRegistry.getTroveManager(_collIndex);
        IActivePool activePool = troveManager.activePool();

        TroveChange memory openTrove;
        openTrove.debtIncrease = _borrowedAmount;
        openTrove.newWeightedRecordedDebt = openTrove.debtIncrease * _interestRate;

        uint256 avgInterestRate = activePool.getNewApproxAvgInterestRateFromTroveChange(openTrove);
        return _calcUpfrontFee(openTrove.debtIncrease, avgInterestRate);
    }

    function calculateAdjustInterestRateUpfrontFee(uint256 _collIndex, uint256 _troveId, uint256 _newInterestRate) public view returns (uint256) {
        ITroveManager troveManager = collateralRegistry.getTroveManager(_collIndex);
        IActivePool activePool = troveManager.activePool();
        LatestTroveData memory trove = troveManager.getLatestTroveData(_troveId);

        if (
            _newInterestRate == trove.annualInterestRate
                || block.timestamp >= trove.lastInterestRateAdjTime + INTEREST_RATE_ADJ_COOLDOWN
        ) {
            return 0;
        }

        return _predictAdjustInterestRateUpfrontFee(activePool, trove, _newInterestRate);
    }

    function getQuoteExactInputSingle(uint256 borrowAmount, bool zeroForOne) public returns (uint256 quotedAmount) {
        IQuoter.QuoteExactSingleParams memory params = IQuoter.QuoteExactSingleParams({
            poolKey: pool,
            zeroForOne: zeroForOne,
            exactAmount: uint128(borrowAmount),
            hookData: abi.encode(ILuniHook.LuniHookData({
                collateralAmount: 0,
                debtAmount: 0,
                upfrontFee: 0,
                caller: USER
            }))
        });
        
        (uint256 amountOut, /*uint256 gasEstimate*/) = QUOTER.quoteExactInputSingle(params);
        
        return amountOut;
    }

    ///@param collateralAmount is the amount of collateral to be deposited in trove
    ///@param borrowAmount is the amount of bold to be borrowed from trove, to be swapped for collateral
    ///@param zeroForOne is true if swapping bold for collateral, false if swapping collateral for bold
    ///@param upfrontFee is the upfront fee to be paid for the swap
    function _swap(uint256 collateralAmount, uint256 borrowAmount, bool zeroForOne, uint256 upfrontFee) internal {
        console.log("SWAPPING");
        //to calculate amountSpecified, we need to know the price of the pool
        //we can get the price of the pool by getting the sqrtPriceX96 from the pool
        //and then converting it to the amount of token0 or token1 that we need to swap
        //so we are swapping borrowAmount for collateral to get amountSpecified

        //amount specified will be the borrowAmount in terms of price of token1
        int256 amountSpecified = int256(getQuoteExactInputSingle(borrowAmount, true));
        console.log("amountSpecified: %s", amountSpecified);
        // slippage tolerance to allow for unlimited price impact
        uint160 MIN_PRICE_LIMIT = TickMath.MIN_SQRT_PRICE + 1;
        uint160 MAX_PRICE_LIMIT = TickMath.MAX_SQRT_PRICE - 1;
        
        //bool zeroForOne = true; //swap token1 for token0
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: amountSpecified,
            sqrtPriceLimitX96: zeroForOne ? MIN_PRICE_LIMIT : MAX_PRICE_LIMIT // unlimited impact
        });

        // in v4, users have the option to receive native ERC20s or wrapped ERC1155 tokens
        // here, we'll take the ERC20s
        PoolSwapTest.TestSettings memory testSettings =
            PoolSwapTest.TestSettings({takeClaims: false, settleUsingBurn: false});

        //console2.log("WETH balance of USER: %s", ERC20(WETH).balanceOf(USER));
        //console2.log("BOLD balance of USER: %s", ERC20(BOLD).balanceOf(USER));

        bytes memory hookData = abi.encode(ILuniHook.LuniHookData({
            collateralAmount: collateralAmount,
            debtAmount: borrowAmount,
            upfrontFee: upfrontFee,
            caller: USER
        }));

        ERC20 token0 = ERC20(WETH);
        ERC20 token1 = ERC20(BOLD);

        vm.startPrank(USER);

        //approve
        token0.approve(address(swapRouter), type(uint256).max);
        token1.approve(address(swapRouter), type(uint256).max);

        token0.approve(address(hookContract), type(uint256).max);
        token1.approve(address(hookContract), type(uint256).max);

        swapRouter.swap(pool, params, testSettings, hookData);
        vm.stopPrank();

    }

}
