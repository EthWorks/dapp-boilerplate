import { BigNumber } from '@ethersproject/bignumber'

export interface ChainState {
  user?: UserState
  shared: SharedState
}

export interface UserState {
  ethBalance: BigNumber
  daiBalance: BigNumber
}

export interface SharedState {
  daiTotalSupply: BigNumber
}
