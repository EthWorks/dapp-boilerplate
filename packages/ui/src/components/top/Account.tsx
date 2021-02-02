import React, { useState } from 'react'
import styled from 'styled-components'
import { Colors, Fonts } from '../../constants'
import { useTransactions, useEthBalance } from '@boilerplate/dapp-framework'
import { shortenAddress } from '../../utils'
import { JazzIcon } from '../icons'
import { HistoryModal } from './HistoryModal'
import { Spinner } from './Spinner'

interface Props {
  address: string
}

export function Account({ address }: Props) {
  const ethBalance = useEthBalance()
  const [open, setOpen] = useState(false)
  const { transactions } = useTransactions()

  const pendingCount = transactions.filter((x) => !x.receipt).length

  return (
    <>
      <Container>
        {ethBalance && <BalanceArea>{ethBalance.formatWithSymbol()}</BalanceArea>}
        <AccountArea onClick={() => setOpen(true)}>
          {pendingCount === 0 && (
            <>
              <JazzIcon address={address} size={24} />
              <Address>{shortenAddress(address)}</Address>
            </>
          )}
          {pendingCount > 0 && (
            <>
              <BigSpinner />
              <Address>{pendingCount} Pending</Address>
            </>
          )}
        </AccountArea>
      </Container>
      {open && <HistoryModal onClose={() => setOpen(false)} />}
    </>
  )
}

const Container = styled.div`
  display: flex;
  font-family: ${Fonts.Monospace};
  font-size: 18px;
`

const AccountArea = styled.button`
  display: inline-flex;
  background: ${Colors.White};
  padding: 8px;
  border: none;
  border-radius: 12px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: ${Colors.Shadow};
`

const Address = styled.span`
  font-size: 18px;
  margin-left: 12px;
  margin-right: 4px;
`

const BalanceArea = styled.div`
  padding: 8px 18px 8px 12px;
  margin-right: -12px;
  border-radius: 12px 0 0 12px;
  background-color: ${Colors.LightGray};
  display: flex;
  justify-content: center;
  align-items: center;
`

const BigSpinner = styled(Spinner)`
  font-size: 24px;
  bottom: 0;
`
