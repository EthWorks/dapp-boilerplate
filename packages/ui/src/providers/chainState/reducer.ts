import { ChainState } from './model'

interface State {
  [chainId: number]:
    | {
        blockNumber: number
        state?: ChainState
        error?: unknown
      }
    | undefined
}

type Action = AccountChanged | FetchSuccess | FetchError

interface AccountChanged {
  type: 'ACCOUNT_CHANGED'
  chainId: number
  blockNumber: number
}

interface FetchSuccess {
  type: 'FETCH_SUCCESS'
  chainId: number
  blockNumber: number
  state: ChainState
}

interface FetchError {
  type: 'FETCH_ERROR'
  chainId: number
  blockNumber: number
  error: unknown
}

export function chainStateReducer(state: State = {}, action: Action) {
  const current = state[action.chainId]?.blockNumber
  if (!current || action.blockNumber >= current) {
    if (action.type === 'ACCOUNT_CHANGED') {
      const existing = state[action.chainId]
      const updated =
        existing?.state && existing.blockNumber === action.blockNumber ? { shared: existing.state.shared } : undefined
      return {
        ...state,
        [action.chainId]: { blockNumber: action.blockNumber, state: updated, error: existing?.error },
      }
    } else if (action.type === 'FETCH_SUCCESS') {
      return {
        ...state,
        [action.chainId]: { blockNumber: action.blockNumber, state: action.state },
      }
    } else if (action.type === 'FETCH_ERROR') {
      return {
        ...state,
        [action.chainId]: { ...state[action.chainId], blockNumber: action.blockNumber, error: action.error },
      }
    }
  }
  return state
}
