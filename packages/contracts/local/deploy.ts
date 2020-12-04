import { deployContract } from 'ethereum-waffle'
import { Wallet } from 'ethers'
import TenCounter from '../build/TenCounter.json'
import { deployMulticall } from './multicall'

export async function deploy(wallet: Wallet) {
  const multicall = await deployMulticall(wallet)
  const counter = await deployContract(wallet, TenCounter, [])
  return {
    multicall,
    counter: counter.address,
  }
}
