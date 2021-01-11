import React, { ReactNode, useCallback, useEffect, useReducer } from 'react'
import { useDebounce, useEthers } from '../../hooks'
import { useBlockNumber } from '../blockNumber/context'
import { ChainStateContext } from './context'
import { chainStateReducer } from './chainStateReducer'
import { callsReducer, ChainCall } from './callsReducer'
import { multicall } from './multicall'

interface Props {
  children: ReactNode
}

export function ChainStateProvider({ children }: Props) {
  const { library, chainId } = useEthers()
  const blockNumber = useBlockNumber()
  const [calls, dispatchCalls] = useReducer(callsReducer, [])
  const [state, dispatchState] = useReducer(chainStateReducer, {})

  const addCalls = useCallback(
    (calls: ChainCall[]) => {
      dispatchCalls({ type: 'ADD_CALLS', calls })
    },
    [dispatchCalls]
  )

  const removeCalls = useCallback(
    (calls: ChainCall[]) => {
      dispatchCalls({ type: 'REMOVE_CALLS', calls })
    },
    [dispatchCalls]
  )

  const debouncedCalls = useDebounce(calls, 100)

  useEffect(() => {
    if (library && blockNumber !== undefined && chainId !== undefined) {
      multicall(library, chainId, blockNumber, debouncedCalls)
        .then((state) => dispatchState({ type: 'FETCH_SUCCESS', blockNumber, chainId, state }))
        .catch((error) => {
          console.error(error)
          dispatchState({ type: 'FETCH_ERROR', blockNumber, chainId, error })
        })
    }
  }, [library, debouncedCalls, blockNumber, chainId])

  const value = chainId !== undefined ? state[chainId] : undefined
  return <ChainStateContext.Provider value={{ value, addCalls, removeCalls }} children={children} />
}
