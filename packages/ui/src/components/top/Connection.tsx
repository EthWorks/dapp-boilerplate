import React, { useEffect } from 'react'
import styled from 'styled-components'
import { UnsupportedChainIdError } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Colors, SUPPORTED_CHAINS } from '../../constants'
import { useEthers } from '../../hooks'
import { Account } from './Account'
import { useConfig } from '../../hooks/useConfig'
import { NetworkConnector } from '../../infrastructure/connectors/NetworkConnector'

const injected = new InjectedConnector({ supportedChainIds: SUPPORTED_CHAINS })

export function Connection() {
  const { activate, account, error } = useEthers()
  const config = useConfig()

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected)
      } else {
        activate(new NetworkConnector(config.network))
      }
    })
  }, [])

  function connect() {
    activate(injected)
  }

  if (error instanceof UnsupportedChainIdError) {
    return <NetworkError>Unsupported network</NetworkError>
  }

  if (account) {
    return <Account address={account} />
  }

  return <Connect onClick={connect}>Connect</Connect>
}

const NetworkError = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  background-color: ${Colors.Red};
  border-radius: 12px;
  box-shadow: ${Colors.Shadow}, inset 0 0 0 2px ${Colors.Black};
  height: 42px;
`

const Connect = styled.button`
  outline: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  background-color: ${Colors.White};
  border: none;
  border-radius: 12px;
  box-shadow: ${Colors.Shadow};
  height: 42px;
  cursor: pointer;
`
