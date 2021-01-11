import { useContext, useEffect } from 'react'
import { ChainCall } from '../providers/chainState/callsReducer'
import { ChainStateContext } from '../providers/chainState/context'

export function useChainCalls(calls: ChainCall[]) {
  const { addCalls, removeCalls, value } = useContext(ChainStateContext)

  useEffect(() => {
    addCalls(calls)
    return () => removeCalls(calls)
  }, [JSON.stringify(calls), addCalls, removeCalls])

  return calls.map(({ address, data }) => {
    return value?.state?.[address]?.[data]
  })
}

export function useChainCall<T>(call: ChainCall & { transform: (value: string) => T }) {
  const [result] = useChainCalls([call])
  if (result !== undefined) {
    return call.transform(result)
  }
}

export function useChainCallIf<T>(condition: boolean, getCall: () => ChainCall & { transform: (value: string) => T }) {
  const call = condition ? getCall() : undefined
  const [result] = useChainCalls(call ? [{ address: call.address, data: call.data }] : [])
  if (result !== undefined) {
    return call?.transform(result)
  }
}
