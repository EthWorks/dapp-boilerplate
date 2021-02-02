import { Interface } from '@ethersproject/abi'
import { BigNumber } from '@ethersproject/bignumber'
import { MULTICALL_ABI, NATIVE_CURRENCY } from '../../constants'
import { MAINNET_CHAIN_ID, useChainCall, useEthers, useMulticallAddress } from '..'
import { CurrencyValue } from '../../model'

const multicallInterface = new Interface(MULTICALL_ABI)

export function useEthBalance() {
  const { chainId = MAINNET_CHAIN_ID, account } = useEthers()
  const multiCallAddress = useMulticallAddress()

  const data = useChainCall(
    !!account && {
      address: multiCallAddress,
      data: multicallInterface.encodeFunctionData('getEthBalance', [account]),
    }
  )

  const currency = NATIVE_CURRENCY[chainId]
  return data !== undefined ? new CurrencyValue(currency, BigNumber.from(data)) : undefined
}
