import { useContext } from 'react'
import { ChainStateContext } from '../chainState/context'

export function useMulticallAddress() {
  return useContext(ChainStateContext).multicallAddress
}
