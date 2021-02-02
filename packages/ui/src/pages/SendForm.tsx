import React, { useState } from 'react'
import styled from 'styled-components'
import { getAddress } from '@ethersproject/address'
import { Colors, Fonts } from '../constants'
import { useDaiBalance, useNumberInput } from '../hooks'
import { useSendDai } from './useSendDai'
import { CurrencyValue, Dai } from '@boilerplate/dapp-framework'

export function SendForm() {
  const [recipient, setRecipient] = useState('')
  const [value, setValue] = useNumberInput(18)
  const balance = useDaiBalance()
  const parsedValue = CurrencyValue.fromString(balance?.currency ?? Dai, value)

  const sendDai = useSendDai(recipient, parsedValue)

  const insufficientBalance = !!balance && balance.lt(parsedValue)
  const invalidAddress = !!recipient && !isValidAddress(recipient)
  const disable = !balance || !recipient || insufficientBalance || invalidAddress

  let buttonText = 'Send'
  if (insufficientBalance) {
    buttonText = 'Insufficient balance'
  } else if (recipient && invalidAddress) {
    buttonText = 'Invalid address'
  }

  async function onSubmit() {
    try {
      await sendDai()
      setValue('')
      setRecipient('')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <InputGroup>
        <Label htmlFor="recipient">Recipient</Label>
        <Input id="recipient" placeholder="0x" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      </InputGroup>
      <InputGroup>
        <WithBalance>
          <Label htmlFor="value">Value</Label>
          <Balance>Balance: {balance?.formatWithSymbol() ?? '-'}</Balance>
        </WithBalance>
        <Input id="value" placeholder="0.0" value={value} onChange={(e) => setValue(e.target.value)} />
      </InputGroup>
      <ButtonArea>
        <Button disabled={disable} onClick={onSubmit}>
          {buttonText}
        </Button>
      </ButtonArea>
    </>
  )
}

function isValidAddress(value: string) {
  try {
    getAddress(value)
    return true
  } catch {
    return false
  }
}

const InputGroup = styled.div`
  margin-bottom: 12px;
`

const Label = styled.label`
  display: block;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 6px;
  margin-left: 12px;
`

const WithBalance = styled.div`
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;

  & > ${Label} {
    margin-bottom: 0;
  }
`

const Balance = styled.p`
  display: block;
  font-size: 0.8rem;
  font-weight: bold;
  margin: 0 12px 0 0;
`

const Input = styled.input`
  display: block;
  width: 100%;
  font-size: 1.2rem;
  padding: 6px 12px;
  border: 1px solid ${Colors.Gray};
  font-family: ${Fonts.Monospace};
  border-radius: 12px;
  outline: none;
`

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
`

const Button = styled.button`
  cursor: pointer;
  padding: 12px 24px;
  border: none;
  background: ${Colors.White};
  border-radius: 12px;
  box-shadow: ${Colors.Shadow};

  &:disabled {
    box-shadow: none;
    background-color: ${Colors.LightGray};
    color: ${Colors.Gray};
    cursor: not-allowed;
  }
`
