import { useEthers } from './useEthers'
import { useChainState } from '../providers'
import { CurrencyValue } from '../model'
import { ChainId, Dai, KovanDai } from '../constants'

export function useDaiBalance() {
  const { chainId = ChainId.Mainnet } = useEthers()
  const chainState = useChainState()

  const value = chainState?.state?.user?.daiBalance
  const currency = chainId === ChainId.Mainnet ? Dai : KovanDai
  return value && new CurrencyValue(currency, value)
}
