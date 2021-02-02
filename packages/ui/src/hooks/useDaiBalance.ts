import { useEthers } from '../dapp-framework/hooks/useEthers'
import { ChainId, Dai, KovanDai } from '../constants'
import { useTokenBalance } from '../dapp-framework/hooks/useTokenBalance'

export function useDaiBalance() {
  const { chainId = ChainId.Mainnet } = useEthers()
  return useTokenBalance(chainId === ChainId.Mainnet ? Dai : KovanDai)
}
