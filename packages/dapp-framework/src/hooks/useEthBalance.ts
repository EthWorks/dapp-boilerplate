import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, MULTICALL_ABI, NATIVE_CURRENCY } from '../constants'
import { useChainCall, useEthers, useMulticallAddress } from '../hooks'
import { CurrencyValue } from '../model'

export function useEthBalance() {
  const { chainId = ChainId.Mainnet, account } = useEthers()
  const multiCallAddress = useMulticallAddress()

  const data = useChainCall(
    !!account && {
      address: multiCallAddress,
      data: MULTICALL_ABI.encodeFunctionData('getEthBalance', [account]),
    }
  )

  const currency = NATIVE_CURRENCY[chainId]
  return data !== undefined ? new CurrencyValue(currency, BigNumber.from(data)) : undefined
}
