import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { ChainId, MULTICALL_ABI, MULTICALL_ADDRESS } from '../../constants'
import { ChainCall } from './callsReducer'
import { ChainState } from './model'

export async function multicall(
  provider: Provider,
  chainId: ChainId,
  blockNumber: number,
  requests: ChainCall[]
): Promise<ChainState> {
  if (requests.length === 0) {
    return {}
  }
  const contract = new Contract(MULTICALL_ADDRESS[chainId], MULTICALL_ABI, provider)
  const [, results]: [BigNumber, string[]] = await contract.aggregate(
    requests.map(({ address, data }) => [address, data]),
    { blockTag: blockNumber }
  )
  const state: ChainState = {}
  for (let i = 0; i < requests.length; i++) {
    const { address, data } = requests[i]
    const result = results[i]
    const stateForAddress = state[address] ?? {}
    stateForAddress[data] = result
    state[address] = stateForAddress
  }
  return state
}
