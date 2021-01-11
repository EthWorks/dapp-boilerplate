import { ChainId, MULTICALL_ABI, MULTICALL_ADDRESS, NATIVE_CURRENCY } from '../constants'
import { useChainCall } from './useChainCalls'
import { Interface } from '@ethersproject/abi'
import { BigNumber } from '@ethersproject/bignumber'
import { useEthers } from './useEthers'
import { CurrencyValue } from '../model'

const multicallInterface = new Interface(MULTICALL_ABI)

export function useEthBalance() {
  const { chainId = ChainId.Mainnet, account } = useEthers()

  const data = useChainCall(
    !!account && {
      address: MULTICALL_ADDRESS[chainId],
      data: multicallInterface.encodeFunctionData('getEthBalance', [account]),
    }
  )

  const currency = NATIVE_CURRENCY[chainId]
  return data !== undefined ? new CurrencyValue(currency, BigNumber.from(data)) : undefined
}
