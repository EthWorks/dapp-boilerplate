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
  switch (chainId) {
    case ChainId.Ganache:
      return fetchGanache(provider, blockNumber, account)
    case ChainId.Mainnet:
      return fetchMainnet(provider, blockNumber, account)
    case ChainId.Kovan:
      return fetchKovan(provider, blockNumber, account)
  }
}

async function fetchMainnet(provider: Provider, blockNumber: number, account: string) {
  const result = await multicall(provider, ChainId.Mainnet, blockNumber, [
    ethBalanceOf(ChainId.Mainnet, account),
    balanceOf(Dai.address, account),
    totalSupply(Dai.address),
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

async function fetchKovan(provider: Provider, blockNumber: number, account: string) {
  const result = await multicall(provider, ChainId.Kovan, blockNumber, [
    ethBalanceOf(ChainId.Kovan, account),
    balanceOf(KovanDai.address, account),
    totalSupply(KovanDai.address),
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

async function fetchGanache(provider: Provider, blockNumber: number, account: string) {
  const result = await multicall(provider, ChainId.Ganache, blockNumber, [ethBalanceOf(ChainId.Ganache, account)])
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
