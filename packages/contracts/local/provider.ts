import Ganache from 'ganache-core'
import { providers, utils } from 'ethers'

export async function startGanache(privateKey: string, port: number) {
  const balance = utils.parseEther('1000').toString()
  const server = Ganache.server({
    accounts: [{ balance, secretKey: privateKey }],
    hardfork: 'muirGlacier',
    gasLimit: '10000000',
  })

  server.listen(port, () => {
    const jsonRpcUrl = `http://localhost:${port}`
    console.log(`  Node url (ganache): ${jsonRpcUrl}...`)
  })

  return new providers.Web3Provider(server.provider as any)
}
