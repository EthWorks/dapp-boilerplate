import React from 'react'
import { render, screen } from '@testing-library/react'

import { Home } from '../../src/pages/Home'

describe('Home', () => {
  it('Shows welcome', () => {
    render(<Home />)
    screen.getByText('Welcome to Ethworks DApp')
  })
})
