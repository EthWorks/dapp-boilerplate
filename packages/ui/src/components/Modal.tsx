import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Close } from './icons'
import { PageContent } from './page'

interface Props {
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Modal({ onClose, title, children }: Props) {
  function onBackgroundClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <Background onClick={onBackgroundClick}>
      <PageContent>
        {title && <Title>{title}</Title>}
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
        {children}
      </PageContent>
    </Background>
  )
}

const Background = styled.div`
  z-index: 100000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  padding-top: 64px;
`

const Title = styled.h1`
  text-align: center;
  margin: 0 0 24px 0;
  font-size: 1.5rem;
`

const CloseButton = styled.button`
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  position: absolute;
  right: 12px;
  top: 12px;
`
