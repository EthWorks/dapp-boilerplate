import React from 'react'
import styled from 'styled-components'
import { Colors, Fonts } from '../../constants'
import { useBlockNumber, useChainState } from '../../providers'

export function BlockNumber() {
  const blockNumber = useBlockNumber()
  const chainState = useChainState()
  const fetchedBlockNumber = chainState?.value?.blockNumber

  const isDifferent = fetchedBlockNumber !== blockNumber
  const toDisplay = blockNumber || fetchedBlockNumber || 0

  return (
    <Wrapper>
      <Text>{toDisplay}</Text>
      {isDifferent ? <Spinner /> : <Dot />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 12px;
  right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Text = styled.span`
  font-family: ${Fonts.Monospace};
  color: ${Colors.Gray};
  margin-right: 8px;
`

const Spinner = styled.div`
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid;
  border-color: ${Colors.Gray} ${Colors.Gray} ${Colors.Gray} transparent;
  animation: spinner-spin 1s infinite;

  @keyframes spinner-spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${Colors.Green};
`
