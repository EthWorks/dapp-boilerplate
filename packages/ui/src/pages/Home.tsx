import React from 'react'
import styled from 'styled-components'
import { Page, PageContent, Title } from '../components'
import { Colors } from '../constants'
import { SendForm } from './SendForm'

export function Home() {
  return (
    <Page>
      <PageContent>
        <Title>Welcome to Ethworks DApp</Title>
        <p>Use the form below to send DAI</p>
        <Separator />
        <SendForm />
        <Separator />
        <p>This boilerplate includes several neat things:</p>
        <ol>
          <li>Metamask connection,</li>
          <li>Transaction history. Click the account address to open,</li>
          <li>
            Automatic blockchain sync. Note that when the block number on the bottom changes there appears a little
            spinner which indicates that the latest state is being fetched,
          </li>
          <li>Git commit version,</li>
          <li>Ability to send DAI.</li>
        </ol>
      </PageContent>
    </Page>
  )
}

const Separator = styled.hr`
  border: none;
  border-bottom: 1px solid ${Colors.LightGray};
  margin: 24px -24px;
`
