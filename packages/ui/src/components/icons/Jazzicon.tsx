import React, { useRef, useMemo, useEffect } from 'react'
import jazzicon from '@metamask/jazzicon'

function getSeed(address: string) {
  return parseInt(address.slice(2, 10), 16)
}

interface Props {
  address: string
  size: number
}

export function JazzIcon({ address, size }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const element = useMemo(() => jazzicon(size, getSeed(address)), [size, address])

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(element)
    }
  }, [address])

  return <div style={{ width: size, height: size }} ref={ref} />
}
