export enum ChainId {
  Mainnet = 1,
  Kovan = 42,
  Ganache = 1337,
}

export const SUPPORTED_CHAINS = [ChainId.Mainnet, ChainId.Kovan, ChainId.Ganache]

// TODO(marik-d): Clean this up.
export const MAINNET_CHAIN_ID = 1
export const ROPSTEN_CHAIN_ID = 3
export const RINKEBY_CHAIN_ID = 4
export const GOERLI_CHAIN_ID = 5
export const KOVAN_CHAIN_ID = 42
export const XDAI_CHAIN_ID = 100
export const GANACHE_CHAIN_ID = 100

export const MULTICALL_ADDRESSES = {
  [MAINNET_CHAIN_ID]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  [ROPSTEN_CHAIN_ID]: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
  [RINKEBY_CHAIN_ID]: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
  [GOERLI_CHAIN_ID]: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  [KOVAN_CHAIN_ID]: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
  [XDAI_CHAIN_ID]: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
}
