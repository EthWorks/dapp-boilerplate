import { useEthers } from './useEthers'
import { CurrencyValue } from '../model'
import { ChainId, Dai, ERC20_ABI, KovanDai } from '../constants'
import { useChainCallIf } from './useChainCalls'
import { Interface } from '@ethersproject/abi'
import { BigNumber } from '@ethersproject/bignumber'

const erc20Interface = new Interface(ERC20_ABI)

export function useDaiBalance() {
  const { chainId = ChainId.Mainnet, account } = useEthers()
  const currency = chainId === ChainId.Mainnet ? Dai : KovanDai

  const balance = useChainCallIf(!!account, () => ({
    address: currency.address,
    data: erc20Interface.encodeFunctionData('balanceOf', [account]),
    transform: (data) => BigNumber.from(data),
  }))

  return balance && new CurrencyValue(currency, balance)
}
