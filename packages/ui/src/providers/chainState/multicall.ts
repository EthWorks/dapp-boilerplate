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
  const contract = new Contract(MULTICALL_ADDRESS[chainId], MULTICALL_ABI, provider)
  const calls = getUnique(requests).map(({ address, data }) => [address, data])
  const [, results]: [BigNumber, string[]] = await contract.aggregate(calls, { blockTag: blockNumber })
  const state: ChainState = {}
  for (let i = 0; i < calls.length; i++) {
    const [address, data] = calls[i]
    const result = results[i]
    const stateForAddress = state[address] ?? {}
    stateForAddress[data] = result
    state[address] = stateForAddress
  }
  return state
}

function getUnique(requests: ChainCall[]) {
  const unique: ChainCall[] = []
  for (const request of requests) {
    if (!unique.find((x) => x.address === request.address && x.data === request.data)) {
      unique.push(request)
    }
  }
  return unique
}
