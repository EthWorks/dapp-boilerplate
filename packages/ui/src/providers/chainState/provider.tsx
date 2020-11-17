import React, { ReactNode, useEffect, useReducer, useState } from 'react'
import { useEthers } from '../../hooks'
import { useBlockNumber } from '../blockNumber/context'
import { ChainStateContext } from './context'
import { fetchChainState } from './fetch'
import { chainStateReducer } from './reducer'

interface Props {
  children: ReactNode
}

export function ChainStateProvider({ children }: Props) {
  const { library, account, chainId } = useEthers()
  const [lastAccount, setLastAccount] = useState(account)
  const blockNumber = useBlockNumber()
  const [state, dispatch] = useReducer(chainStateReducer, {})

  useEffect(() => {
    if (blockNumber !== undefined && chainId !== undefined && lastAccount !== account) {
      setLastAccount(account)
      dispatch({ type: 'ACCOUNT_CHANGED', blockNumber, chainId })
    }
  }, [lastAccount, account, blockNumber, chainId])

  useEffect(() => {
    if (library && account && blockNumber !== undefined && chainId !== undefined) {
      fetchChainState(library, chainId, blockNumber, account)
        .then((state) => dispatch({ type: 'FETCH_SUCCESS', blockNumber, chainId, state }))
        .catch((error) => {
          console.error(error)
          dispatch({ type: 'FETCH_ERROR', blockNumber, chainId, error })
        })
    }
  }, [library, account, blockNumber, chainId])

  const value = chainId !== undefined ? state[chainId] : undefined
  return <ChainStateContext.Provider value={value} children={children} />
}
