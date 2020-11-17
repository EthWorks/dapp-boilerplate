// SPDX-License-Identifier: MIT

pragma solidity =0.7.0;

import './libraries/Math.sol';
import './interfaces/ITenCounter.sol';

contract TenCounter is ITenCounter {
    uint256 public override value;

    function increment() public override {
        value = Math.min(value + 1, 10);
    }
}
