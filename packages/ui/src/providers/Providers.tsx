import React, { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { BlockNumberProvider } from './blockNumber/provider'
import { ChainStateProvider } from './chainState/provider'
import { GlobalStyle } from './GlobalStyle'
import { TransactionProvider } from './transactions/provider'

interface Props {
  children: ReactNode
}
export function Providers(props: Props) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BlockNumberProvider>
        <ChainStateProvider>
          <TransactionProvider>
            <BrowserRouter>
              <GlobalStyle />
              {props.children}
            </BrowserRouter>
          </TransactionProvider>
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
