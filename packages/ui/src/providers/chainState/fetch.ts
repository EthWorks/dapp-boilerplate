import { Provider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, Dai, KovanDai } from '../../constants'
import { ChainState } from './model'
import { balanceOf, ethBalanceOf, multicall, totalSupply } from './multicall'

export async function fetchChainState(
  provider: Provider,
  chainId: ChainId,
  blockNumber: number,
  account: string
): Promise<ChainState> {
  if (chainId === ChainId.Ganache) {
    const result = await multicall(provider, chainId, blockNumber, [
      ethBalanceOf(chainId, account),
    ])
    return {
      user: {
        ethBalance: result[0],
        daiBalance: BigNumber.from(0),
      },
      shared: {
        daiTotalSupply: BigNumber.from(0),
      },
    }
  }

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
