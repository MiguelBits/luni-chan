// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";

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
import {IERC20} from "forge-std/interfaces/IERC20.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {SortTokens, MockERC20} from "v4-core/test/utils/SortTokens.sol";
import {IAllowanceTransfer} from "permit2/src/interfaces/IAllowanceTransfer.sol";
import {PositionManager} from "v4-periphery/src/PositionManager.sol";
import {PoolSwapTest} from "v4-core/src/test/PoolSwapTest.sol";
//HOOK
import {Hook} from "../src/Hook.sol";

contract UnichainTest is Test {

    //BOLD///////////////////////////////////////////////////////////////////////////////////////
    address public constant BOLD = 0x66bB78C022A0c759Ed5a679cfC840F0269f17B8f;
    address public constant WETH = 0xED7CAcC195890754B28932261Ea3235B1dCa8D15;
    
    address public constant USER = 0x5C89102bcBf5Fa85f9aec152b0a3Ef89634DEcB5;
    uint256 public constant AMOUNT_COLLATERAL = 1000000000000000000000000;
    uint256 public constant AMOUNT_BOLD = 1000000000000000000000000000;

    address public constant BORROWER_OPERATIONS = 0xf2baef98FF6b2bA5F75B22C85a56D0aDd238c347;

    //UNIV4////////////////////////////////////////////////////////////////////////////////////
    
    /// @dev populated with default sepolia addresses from: https://docs.uniswap.org/contracts/v4/deployments
    IPoolManager constant POOLMANAGER = IPoolManager(address(0xC81462Fec8B23319F288047f8A03A57682a35C1A));
    PositionManager constant posm = PositionManager(payable(address(0xB433cB9BcDF4CfCC5cAB7D34f90d1a7deEfD27b9)));
    IAllowanceTransfer constant PERMIT2 = IAllowanceTransfer(address(0x38c21A3Ee095d7cB72aF297C6EaA5263df71217B));
    // PoolSwapTest Contract address, default to the anvil address
    PoolSwapTest swapRouter = PoolSwapTest(0xe437355299114d35Ffcbc0c39e163B24A8E9cBf1);
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

    // starting price of the pool, in sqrtPriceX96
    uint160 startingPrice = 79228162514264337593543950336; // floor(sqrt(1) * 2^96)

    // --- liquidity position configuration --- //
    uint256 public token0Amount = 10e18;
    uint256 public token1Amount = 50000e18;

    // range of the position
    int24 tickLower = -600; // must be a multiple of tickSpacing
    int24 tickUpper = 600;
    /////////////////////////////////////


    //HOOK/////////////////////////////////////////////////////////////////////////////////////
    Hook public hookContract;

    function setUp() public {
        //vm.createSelectFork("https://eth-sepolia.g.alchemy.com/v2/_oXBG8AigQRseN1k3i4srkLBxFeP6EJN");

        vm.deal(USER, 1000 ether);

        currency0 = Currency.wrap(BOLD);
        currency1 = Currency.wrap(WETH);
        (currency0, currency1) = SortTokens.sort(MockERC20(BOLD), MockERC20(WETH));

        // Deploy the hook to an address with the correct flags
        address flags = address(
            uint160(
                Hooks.BEFORE_SWAP_FLAG | Hooks.AFTER_SWAP_FLAG
            ) ^ (0x4444 << 144) // Namespace the hook to avoid collisions
        );
        //TODO: VERY IMPORTANT TO CHANGE
        bytes memory constructorArgs = abi.encode(POOLMANAGER, BorrowerOperations(BORROWER_OPERATIONS)); //Add all the necessary constructor arguments from the hook
        deployCodeTo("Hook.sol:Hook", constructorArgs, flags);

        hookContract = Hook(flags);
        pool = PoolKey({
            currency0: currency0,
            currency1: currency1,
            fee: lpFee,
            tickSpacing: tickSpacing,
            hooks: hookContract
        }); 
        console2.log("pool hook address: %s", address(hookContract));
        //add pool
    }

    function test_openTrove() public {

        console2.log("WETH balance of USER: %s", ERC20(WETH).balanceOf(USER));

        deal(WETH, USER, AMOUNT_COLLATERAL*2);

        console2.log("WETH balance of USER: %s", ERC20(WETH).balanceOf(USER));

        //deal(BOLD, USER, 10 ether);
        /*
            0	_owner	address	0x3b1b0C2Bf68D0e2304960E1F32c607771B8CFE01
            1	_ownerIndex	uint256	0
            2	_collAmount	uint256	1000000000000000000000000
            3	_boldAmount	uint256	1000000000000000000000000000
            4	_upperHint	uint256	0
            5	_lowerHint	uint256	0
            6	_annualInterestRate	uint256	50000000000000000
            7	_maxUpfrontFee	uint256	115792089237316195423570985008687907853269984665640564039457584007913129639935
            8	_addManager	address	0x0000000000000000000000000000000000000000
            9	_removeManager	address	0x0000000000000000000000000000000000000000
            10	_receiver	address	0x0000000000000000000000000000000000000000
        */

        //bold balance before open trove
        console.log("b4 user balance", ERC20(BOLD).balanceOf(USER));

        vm.startPrank(USER);

        //approve
        ERC20(WETH).approve(BORROWER_OPERATIONS, type(uint256).max);
        BorrowerOperations(BORROWER_OPERATIONS).openTrove(
            address(2),
            0,
            AMOUNT_COLLATERAL,
            AMOUNT_BOLD,
            0,
            0,
            50000000000000000,
            115792089237316195423570985008687907853269984665640564039457584007913129639935,
            address(2),
            address(2),
            address(2)
        );

        vm.stopPrank();
        console.log("af user balance", ERC20(BOLD).balanceOf(USER));

        console2.log("WETH balance of USER: %s", ERC20(WETH).balanceOf(USER));
        console2.log("BOLD balance of USER: %s", ERC20(BOLD).balanceOf(USER));
    }

    /// @dev helper function for encoding mint liquidity operation
    /// @dev does NOT encode SWEEP, developers should take care when minting liquidity on an ETH pair
    function _mintLiquidityParams(
        PoolKey memory poolKey,
        int24 _tickLower,
        int24 _tickUpper,
        uint256 liquidity,
        uint256 amount0Max,
        uint256 amount1Max,
        address recipient,
        bytes memory hookData
    ) internal pure returns (bytes memory, bytes[] memory) {
        bytes memory actions = abi.encodePacked(uint8(Actions.MINT_POSITION), uint8(Actions.SETTLE_PAIR));

        bytes[] memory params = new bytes[](2);
        params[0] = abi.encode(poolKey, _tickLower, _tickUpper, liquidity, amount0Max, amount1Max, recipient, hookData);
        params[1] = abi.encode(poolKey.currency0, poolKey.currency1);
        return (actions, params);
    }

    function tokenApprovals() public {
        ERC20 token0 = ERC20(WETH);
        ERC20 token1 = ERC20(BOLD);
        if (!currency0.isAddressZero()) {
            token0.approve(address(PERMIT2), type(uint256).max);
            PERMIT2.approve(address(token0), address(posm), type(uint160).max, type(uint48).max);
        }
        if (!currency1.isAddressZero()) {
            token1.approve(address(PERMIT2), type(uint256).max);
            PERMIT2.approve(address(token1), address(posm), type(uint160).max, type(uint48).max);
        }
    }

    function test_addLiquidity() public {
        bytes memory hookData = new bytes(0);

        // Converts token amounts to liquidity units
        uint128 liquidity = LiquidityAmounts.getLiquidityForAmounts(
            startingPrice,
            TickMath.getSqrtPriceAtTick(tickLower),
            TickMath.getSqrtPriceAtTick(tickUpper),
            token0Amount,
            token1Amount
        );

        // slippage limits
        uint256 amount0Max = token0Amount + 1 wei;
        uint256 amount1Max = token1Amount + 1 wei;
        
        console2.log("liquidity: %s", liquidity);
                console2.log("WETH balance of USER: %s", ERC20(WETH).balanceOf(USER));

        deal(WETH, USER, token0Amount);

        console2.log("WETH balance of USER: %s", ERC20(WETH).balanceOf(USER));

        deal(BOLD, USER, token1Amount);

        console2.log("BOLD balance of USER: %s", ERC20(BOLD).balanceOf(USER));

        (bytes memory actions, bytes[] memory mintParams) =
            _mintLiquidityParams(pool, tickLower, tickUpper, liquidity, amount0Max, amount1Max, address(this), hookData);
        
        // multicall parameters
        bytes[] memory params = new bytes[](2);

        // initialize pool
        params[0] = abi.encodeWithSelector(posm.initializePool.selector, pool, startingPrice, hookData);

        //mint liquidity
        params[1] = abi.encodeWithSelector(
            posm.modifyLiquidities.selector, abi.encode(actions, mintParams), block.timestamp + 60
        );

        // if the pool is an ETH pair, native tokens are to be transferred
        uint256 valueToPass = currency0.isAddressZero() ? amount0Max : 0;

        // multicall
        vm.startPrank(USER);

        tokenApprovals();

        // multicall to atomically create pool & add liquidity
        posm.multicall{value: valueToPass}(params);

        vm.stopPrank();

    }

    function _swap(int256 amountSpecified, uint256 borrowSpecificAmount) public {

        // slippage tolerance to allow for unlimited price impact
        uint160 MIN_PRICE_LIMIT = TickMath.MIN_SQRT_PRICE + 1;
        uint160 MAX_PRICE_LIMIT = TickMath.MAX_SQRT_PRICE - 1;
        bool zeroForOne = true; //swap token1 for token0
        IPoolManager.SwapParams memory params = IPoolManager.SwapParams({
            zeroForOne: zeroForOne,
            amountSpecified: amountSpecified,
            sqrtPriceLimitX96: zeroForOne ? MIN_PRICE_LIMIT : MAX_PRICE_LIMIT // unlimited impact
        });

        // in v4, users have the option to receieve native ERC20s or wrapped ERC1155 tokens
        // here, we'll take the ERC20s
        PoolSwapTest.TestSettings memory testSettings =
            PoolSwapTest.TestSettings({takeClaims: false, settleUsingBurn: false});

        deal(WETH, USER, uint256(amountSpecified)*3);
        deal(BOLD, USER, uint256(amountSpecified)*3);
        console2.log("WETH balance of USER: %s", ERC20(WETH).balanceOf(USER));
        console2.log("BOLD balance of USER: %s", ERC20(BOLD).balanceOf(USER));

        bytes memory hookData = abi.encode(borrowSpecificAmount, USER);

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

    function test_SopenTrove_swap() public {
    
        //add liquidity
        test_addLiquidity();
        //open trove
        test_openTrove();
        
        //swap
        _swap(1e18, 0);

    }

    function test_swapHook() public {
        //add liquidity
        test_addLiquidity();

        //log balances of user
        console.log("B4 USER SWAP bold:", ERC20(BOLD).balanceOf(USER));
        console.log("B4 USER SWAP weth:", ERC20(WETH).balanceOf(USER));
        //swap
        _swap(10e18, 2000e18);

        //log balances of user
        console.log("AF USER SWAP bold:", ERC20(BOLD).balanceOf(USER));
        console.log("AF USER SWAP weth:", ERC20(WETH).balanceOf(USER));
    }

}