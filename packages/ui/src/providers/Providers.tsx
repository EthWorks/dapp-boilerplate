import React, { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { GANACHE_MULTICALL } from '../constants'
import { ChainId, DappProvider } from '@boilerplate/dapp-framework'
import { GlobalStyle } from './GlobalStyle'

interface Props {
  children: ReactNode
}

export function Providers(props: Props) {
  return (
    <DappProvider multicallAddresses={{ [ChainId.Ganache]: GANACHE_MULTICALL }}>
      <BrowserRouter>
        <GlobalStyle />
        {props.children}
      </BrowserRouter>
    </DappProvider>
  )
}
