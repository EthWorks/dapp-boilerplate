import { expect } from 'chai'
import { BigNumber } from '@ethersproject/bignumber'
import { parseUnits } from '@ethersproject/units'
import { CurrencyValue, formatCurrency } from '../../src/model/CurrencyValue'
import { Currency } from '../../src/model/Currency'
import { ChainId } from '../../src/constants'

describe('CurrencyValue', () => {
  describe('fromString', () => {
    const testCases: [number, string, string][] = [
      [0, '0', '0'],
      [0, '.', '0'],
      [0, '123', '123'],
      [0, '123.', '123'],

      [9, '0', '0'],
      [9, '.', '0'],
      [9, '.0', '0'],
      [9, '0.0', '0'],
      [9, '.123', '123000000'],
      [9, '123', '123000000000'],
      [9, '123.', '123000000000'],
      [9, '123.456', '123456000000'],
      [9, '0.000000001', '1'],

      [18, '0', '0'],
      [18, '.', '0'],
      [18, '.0', '0'],
      [18, '0.0', '0'],
      [18, '.123', '123000000000000000'],
      [18, '123', '123000000000000000000'],
      [18, '123.', '123000000000000000000'],
      [18, '123.456', '123456000000000000000'],
      [18, '0.000000000000000001', '1'],
    ]
    testCases.forEach(([decimals, input, output]) => {
      it(`returns ${output} units for "${input}" with ${decimals} decimals`, () => {
        const currency = new Currency(ChainId.Mainnet, '', '', decimals)
        const result = CurrencyValue.fromString(currency, input)
        expect(result.value).to.deep.eq(BigNumber.from(output))
      })
    })

    it('throws for non-number input', () => {
      const currency = new Currency(ChainId.Mainnet, '', '', 123)
      expect(() => CurrencyValue.fromString(currency, 'asd')).to.throw('Invalid value provided')
    })

    it('throws for too much decimals', () => {
      const currency = new Currency(ChainId.Mainnet, '', '', 3)
      expect(() => CurrencyValue.fromString(currency, '0.1234')).to.throw('Invalid precision')
    })
  })

  describe('toString', () => {
    const testCases: [number, string, string][] = [
      [0, '0', '0'],
      [0, '123', '123'],
      [9, '0', '0'],
      [9, '123000000', '0.123'],
      [9, '123000000000', '123'],
      [9, '123456000000', '123.456'],
      [9, '1', '0.000000001'],
      [18, '123000000000000000', '0.123'],
      [18, '123000000000000000000', '123'],
      [18, '123456000000000000000', '123.456'],
      [18, '1', '0.000000000000000001'],
    ]
    testCases.forEach(([decimals, input, output]) => {
      it(`returns ${output} for ${input} with ${decimals} decimals`, () => {
        const currency = new Currency(ChainId.Mainnet, '', '', decimals)
        const result = new CurrencyValue(currency, BigNumber.from(input)).toString()
        expect(result).to.deep.eq(output)
      })
    })
  })

  describe('formatCurrency', () => {
    const testCases: [number, string, string][] = [
      [0, '0', '0'],
      [0, '1', '1'],
      [0, '1000', '1,000'],
      [0, '1234567890', '1,234,567,890'],

      [9, '0', '0'],
      [9, '1', '1'],
      [9, '1000', '1,000'],
      [9, '1000.1111', '1,000.11'],
      [9, '1000.123456789', '1,000.12'],
      [9, '1234567890.012345678', '1,234,567,890'],
      [9, '0.123456789', '0.123456'],
      [9, '0.001234567', '0.00123456'],

      [18, '0', '0'],
      [18, '1', '1'],
      [18, '1000', '1,000'],
      [18, '1000.1111', '1,000.11'],
      [18, '1000.123456789', '1,000.12'],
      [18, '1234567890.0123456789', '1,234,567,890'],
      [18, '0.123456789', '0.123456'],
      [18, '0.00123456789', '0.00123456'],
    ]
    testCases.forEach(([decimals, value, result]) => {
      it(`returns ${result} for ${value} with ${decimals} decimals`, () => {
        expect(formatCurrency(decimals, parseUnits(value, decimals))).to.eq(result)
      })
    })
  })
})
