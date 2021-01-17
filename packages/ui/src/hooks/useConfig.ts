const infuraRpcUrl = (network: string) => `https://${network}.infura.io/v3/f2b66022539c4d5a9e6ac5b3dfaab15c`

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
