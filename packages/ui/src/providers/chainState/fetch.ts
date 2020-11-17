import { Provider } from '@ethersproject/providers'
import { ChainId, Dai, KovanDai } from '../../constants'
import { ChainState } from './model'
import { balanceOf, ethBalanceOf, multicall, totalSupply } from './multicall'

export async function fetchChainState(
  provider: Provider,
  chainId: ChainId,
  blockNumber: number,
  account: string
): Promise<ChainState> {
  const dai = chainId === ChainId.Mainnet ? Dai : KovanDai

  const result = await multicall(provider, chainId, blockNumber, [
    ethBalanceOf(chainId, account),
    balanceOf(dai.address, account),
    totalSupply(dai.address),
  ])

  return {
    user: {
      ethBalance: result[0],
      daiBalance: result[1],
    },
    shared: {
      daiTotalSupply: result[2],
    },
  }
}
