import React, { ReactNode } from 'react'
import { TopBar } from '../top'
import { BlockNumber } from './BlockNumber'
import { Version } from './Version'

interface Props {
  children: ReactNode
}

export function Page({ children }: Props) {
  return (
    <>
      <TopBar />
      {children}
      <Version />
      <BlockNumber />
    </>
  )
}
