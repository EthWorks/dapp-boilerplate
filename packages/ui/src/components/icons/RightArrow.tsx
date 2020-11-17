import React from 'react'
import styled from 'styled-components'

export function RightArrow() {
  return (
    <SvgIcon
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M 14 8 L 8 13 M 14 8 L 8 3 M 2 8 L 14 8" />
    </SvgIcon>
  )
}

const SvgIcon = styled.svg`
  width: 1em;
  height: 1em;
  position: relative;
  bottom: -0.1em;
`
