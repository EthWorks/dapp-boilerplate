import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.svg'

export function Logo() {
  return <Image src={logo} />
}

const Image = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
`
