import { useEthers, useTokenBalance } from '@boilerplate/dapp-framework'
import { ChainId, Dai, KovanDai } from '../constants'

export function useDaiBalance() {
  const { chainId = ChainId.Mainnet } = useEthers()
  return useTokenBalance(chainId === ChainId.Mainnet ? Dai : KovanDai)
}
