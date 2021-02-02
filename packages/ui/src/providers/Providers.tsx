import React, { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { GANACHE_MULTICALL } from '../constants'
import { DappProvider, GANACHE_CHAIN_ID } from '@boilerplate/dapp-framework'
import { GlobalStyle } from './GlobalStyle'

interface Props {
  children: ReactNode
}

export function Providers(props: Props) {
  return (
    <DappProvider multicallAddresses={{ [GANACHE_CHAIN_ID]: GANACHE_MULTICALL }}>
      <BrowserRouter>
        <GlobalStyle />
        {props.children}
      </BrowserRouter>
    </DappProvider>
  )
}
