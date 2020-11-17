// SPDX-License-Identifier: MIT

pragma solidity =0.7.0;

interface ITenCounter {
    function value() external view returns (uint256);

    function increment() external;
}
