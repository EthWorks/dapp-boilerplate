import { createContext, useContext } from 'react'
import { ChainState } from './model'

export const ChainStateContext = createContext<
  | {
      blockNumber: number
      state?: ChainState
      error?: unknown
    }
  | undefined
>(undefined)

export function useChainState() {
  return useContext(ChainStateContext)
}
