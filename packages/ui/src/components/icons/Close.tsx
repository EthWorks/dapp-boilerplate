import React from 'react'
import styled from 'styled-components'

export function Close() {
  return (
    <SvgIcon
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M 2 2 L 14 14 M 14 2 L 2 14" />
    </SvgIcon>
  )
}

const SvgIcon = styled.svg`
  width: 1em;
  height: 1em;
  position: relative;
  bottom: -0.1em;
`
