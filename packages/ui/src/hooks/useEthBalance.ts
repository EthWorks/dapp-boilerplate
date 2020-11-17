import { useEthers } from './useEthers'
import { useChainState } from '../providers'
import { CurrencyValue } from '../model'
import { ChainId, Ether, KovanEther } from '../constants'

export function useEthBalance() {
  const { chainId = ChainId.Mainnet } = useEthers()
  const chainState = useChainState()

  const value = chainState?.state?.user?.ethBalance
  const currency = chainId === ChainId.Mainnet ? Ether : KovanEther
  return value && new CurrencyValue(currency, value)
}
