import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../constants'
import { Logo } from './Logo'
import { Connection } from './Connection'

export function TopBar() {
  return (
    <Bar>
      <Logo />
      <Connection />
    </Bar>
  )
}

const Bar = styled.header`
  background-color: ${Colors.White};
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 24px;
`
