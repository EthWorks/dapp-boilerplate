// SPDX-License-Identifier: MIT

pragma solidity =0.7.0;

library Math {
    function min(uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = x < y ? x : y;
    }
}
