import { ChainId, Dai, KovanDai, useEthers, useTokenBalance } from '@boilerplate/dapp-framework'

export function useDaiBalance() {
  const { chainId = ChainId.Mainnet } = useEthers()
  return useTokenBalance(chainId === ChainId.Mainnet ? Dai : KovanDai)
}
