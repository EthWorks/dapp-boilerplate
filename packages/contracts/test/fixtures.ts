import { Wallet } from 'ethers'
import { deployContract } from 'ethereum-waffle'

import MathTestJSON from '../build/MathTest.json'
import { MathTest } from '../build/types/MathTest'

import TenCounterJSON from '../build/TenCounter.json'
import { TenCounter } from '../build/types/TenCounter'

export async function mathFixture([wallet]: Wallet[]) {
  const math = (await deployContract(wallet, MathTestJSON)) as MathTest
  return { math }
}

export async function tenCounterFixture([wallet]: Wallet[]) {
  const tenCounter = (await deployContract(wallet, TenCounterJSON)) as TenCounter
  return { tenCounter }
}
