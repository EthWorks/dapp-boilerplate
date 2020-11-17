import { Interface } from '@ethersproject/abi'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { ChainId, ERC20_ABI, MULTICALL_ABI, MULTICALL_ADDRESS } from '../../constants'

const erc20Interface = new Interface(ERC20_ABI)
const multicallInterface = new Interface(MULTICALL_ABI)

export interface MulticallRequest {
  address: string
  data: string
  decode: (result: string) => any
}

export async function multicall(
  provider: Provider,
  chainId: ChainId,
  blockNumber: number,
  requests: MulticallRequest[]
): Promise<any[]> {
  const contract = new Contract(MULTICALL_ADDRESS[chainId], MULTICALL_ABI, provider)
  const calls = requests.map(({ address, data }) => [address, data])
  const [, returnData]: [BigNumber, string[]] = await contract.aggregate(calls, { blockTag: blockNumber })
  return returnData.map((result, i) => requests[i].decode(result))
}

export const balanceOf = (token: string, account: string): MulticallRequest => ({
  address: token,
  data: erc20Interface.encodeFunctionData('balanceOf', [account]),
  decode: (result: string) => BigNumber.from(result),
})

export const ethBalanceOf = (chainId: ChainId, account: string): MulticallRequest => ({
  address: MULTICALL_ADDRESS[chainId],
  data: multicallInterface.encodeFunctionData('getEthBalance', [account]),
  decode: (result: string) => BigNumber.from(result),
})

export const totalSupply = (token: string): MulticallRequest => ({
  address: token,
  data: erc20Interface.encodeFunctionData('totalSupply'),
  decode: (result: string) => BigNumber.from(result),
})
