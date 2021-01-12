import { Interface } from '@ethersproject/abi'
import { Dai, ERC20_ABI, ChainId, KovanDai } from '../constants'
import { useEthers, useTransactions } from '../dapp-framework'
import { CurrencyValue } from '../model'
import { shortenAddress } from '../utils'

export function useSendDai(recipient: string, value: CurrencyValue) {
  const { library, chainId } = useEthers()
  const { addTransaction } = useTransactions()

  async function sendDai() {
    if (recipient && library && chainId) {
      const data = new Interface(ERC20_ABI).encodeFunctionData('transfer', [recipient, value.value])
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
