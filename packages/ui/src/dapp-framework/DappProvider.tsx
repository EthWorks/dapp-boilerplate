import React, { ReactNode } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { BlockNumberProvider } from './blockNumber/provider'
import { ChainStateProvider } from './chainState/provider'
import { TransactionProvider } from './transactions/provider'
import { MULTICALL_ADDRESSES } from './constants'

export interface DappProviderProps {
  children: ReactNode
  multicallAddresses?: {
    [chainId: number]: string
  }
}

export function DappProvider(props: DappProviderProps) {
  const multicallAddresses = { ...MULTICALL_ADDRESSES, ...props.multicallAddresses }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BlockNumberProvider>
        <ChainStateProvider multicallAddresses={multicallAddresses}>
          <TransactionProvider children={props.children} />
        </ChainStateProvider>
      </BlockNumberProvider>
    </Web3ReactProvider>
  )
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}
