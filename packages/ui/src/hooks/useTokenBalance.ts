import { useEthers } from './useEthers'
import { CurrencyValue, Token } from '../model'
import { ChainId } from '../constants'
import { useChainCallIf } from './useChainCalls'
import { Interface } from '@ethersproject/abi'
import { BigNumber } from '@ethersproject/bignumber'

const balanceInterface = new Interface(['function balanceOf(address) view returns(uint256)'])

export function useTokenBalance(token: Token) {
  const { chainId = ChainId.Mainnet, account } = useEthers()

  const balance = useChainCallIf(!!account && token.chainId === chainId, () => ({
    address: token.address,
    data: balanceInterface.encodeFunctionData('balanceOf', [account]),
    transform: (data) => BigNumber.from(data),
  }))

  return balance && new CurrencyValue(token, balance)
}
