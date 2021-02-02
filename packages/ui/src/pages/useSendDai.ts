import { ChainId, CurrencyValue, Dai, ERC20_ABI, KovanDai, useEthers, useTransactions } from '@boilerplate/dapp-framework'
import { shortenAddress } from '../utils'

export function useSendDai(recipient: string, value: CurrencyValue) {
  const { library, chainId } = useEthers()
  const { addTransaction } = useTransactions()

  async function sendDai() {
    if (recipient && library && chainId) {
      const data = ERC20_ABI.encodeFunctionData('transfer', [recipient, value.value])
      const signer = library.getSigner()
      const tx = await signer.sendTransaction({
        to: chainId === ChainId.Mainnet ? Dai.address : KovanDai.address,
        data,
      })
      addTransaction({
        chainId,
        description: `Send ${value.formatWithSymbol()} to ${shortenAddress(recipient)}`,
        from: tx.from,
        hash: tx.hash,
      })
    }
  }

  return sendDai
}
