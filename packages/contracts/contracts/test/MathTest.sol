// SPDX-License-Identifier: MIT

pragma solidity =0.7.0;

import '../libraries/Math.sol';

contract MathTest {
    function min(uint256 x, uint256 y) external pure returns (uint256 z) {
        return Math.min(x, y);
    }
}
