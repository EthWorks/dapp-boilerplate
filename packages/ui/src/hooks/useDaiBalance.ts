import { useEthers } from './useEthers'
import { ChainId, Dai, KovanDai } from '../constants'
import { useTokenBalance } from './useTokenBalance'

export function useDaiBalance() {
  const { chainId = ChainId.Mainnet } = useEthers()
  return useTokenBalance(chainId === ChainId.Mainnet ? Dai : KovanDai)
}
