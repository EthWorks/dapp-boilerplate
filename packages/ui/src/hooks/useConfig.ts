const infuraProjectId = process.env.INFURA_PROJECT_ID || ''
const infuraRpcUrl = (network: string) => `https://${network}.infura.io/v3/${infuraProjectId}`

export function useConfig() {
  return {
    network: {
      urls: {
        1: infuraRpcUrl('mainnet'),
        3: infuraRpcUrl('Ropsten'),
        4: infuraRpcUrl('Rinkeby'),
        5: infuraRpcUrl('Gorli'),
        42: infuraRpcUrl('Kovan'),
      },
      defaultChainId: 1,
    },
  }
}
