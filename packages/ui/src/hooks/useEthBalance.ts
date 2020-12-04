import { useEthers } from './useEthers'
import { useChainState } from '../providers'
import { CurrencyValue } from '../model'
import { ChainId, NATIVE_CURRENCY } from '../constants'

export function useEthBalance() {
  const { chainId = ChainId.Mainnet } = useEthers()
  const chainState = useChainState()

  const value = chainState?.state?.user?.ethBalance
  const currency = NATIVE_CURRENCY[chainId]
  return value && new CurrencyValue(currency, value)
}
