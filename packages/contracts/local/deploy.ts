import { Wallet } from 'ethers'
import { deployMulticall } from './multicall'

export async function deploy(wallet: Wallet) {
  const multicall = await deployMulticall(wallet)

  return {
    wallet: wallet.address,
    privateKey: wallet.privateKey,
    multicall,
  }
}
