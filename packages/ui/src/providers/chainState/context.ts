import { createContext, useContext } from 'react'
import { ChainCall } from './callsReducer'
import { ChainState } from './model'

export const ChainStateContext = createContext<{
  value?: {
    blockNumber: number
    state?: ChainState
    error?: unknown
  }
  addCalls(calls: ChainCall[]): void
  removeCalls(calls: ChainCall[]): void
}>({
  addCalls: () => {
    // empty
  },
  removeCalls: () => {
    // empty
  },
})

export function useChainState() {
  return useContext(ChainStateContext)
}
