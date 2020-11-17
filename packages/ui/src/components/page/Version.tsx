import React from 'react'
import styled from 'styled-components'
import { Colors, Fonts } from '../../constants'

export function Version() {
  // eslint-disable-next-line no-undef
  return <Text>Version {GIT_VERSION}</Text>
}

const Text = styled.div`
  position: absolute;
  bottom: 12px;
  left: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${Fonts.Monospace};
  color: ${Colors.Gray};
`
