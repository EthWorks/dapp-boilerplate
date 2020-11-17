import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import { Currency } from './Currency'

const NUMBER_REGEX = /^\d*(\.\d*)?$/

export class CurrencyValue {
  constructor(readonly currency: Currency, readonly value: BigNumber) {}

  static fromString(currency: Currency, value: string) {
    if (!NUMBER_REGEX.test(value)) {
      throw new Error('Invalid value provided')
    }
    let [integer = '', decimal = ''] = value.split('.')
    if (integer === '') {
      integer = '0'
    }
    if (decimal.length < currency.decimals) {
      decimal = decimal.padEnd(currency.decimals, '0')
    } else if (decimal.length > currency.decimals) {
      throw new Error('Invalid precision')
    }
    const bigNumber = BigNumber.from(integer.concat(decimal))
    return new CurrencyValue(currency, bigNumber)
  }

  toString() {
    const result = formatUnits(this.value, this.currency.decimals)
    if (result.endsWith('.0')) {
      return result.substring(0, result.length - 2)
    }
    return result
  }

  format() {
    return formatCurrency(this.currency.decimals, this.value)
  }

  formatWithSymbol() {
    return `${formatCurrency(this.currency.decimals, this.value)} ${this.currency.symbol}`
  }

  lt(currencyValue: CurrencyValue) {
    if (this.currency !== currencyValue.currency) {
      throw new Error('Cannot compare different currencies')
    }
    return this.value.lt(currencyValue.value)
  }
}

const SIGNIFICANT_DIGITS = 6

export function formatCurrency(decimals: number, value: BigNumber): string {
  const stringified = value.toString()

  let decimalPart =
    stringified.length <= decimals
      ? stringified.padStart(decimals, '0')
      : stringified.substring(stringified.length - decimals)
  decimalPart = stripEndZeroes(decimalPart)

  let integerPart = stringified.length <= decimals ? '0' : stringified.substring(0, stringified.length - decimals)
  integerPart = applyCommaSeparator(integerPart)

  const uncut = decimalPart !== '' ? `${integerPart}.${decimalPart}` : integerPart
  return cutToSignificantDigits(uncut)
}

function applyCommaSeparator(value: string) {
  const commaCount = value.length / 3
  const resultValue = value.split('')
  for (let i = 1; i < commaCount; i++) {
    resultValue.splice(-4 * i + 1, 0, ',')
  }
  return resultValue.join('')
}

function stripEndZeroes(value: string) {
  return value.replace(/0+$/, '')
}

function cutToSignificantDigits(value: string) {
  if (!value.includes('.')) {
    return value
  }
  let digitsFound = 0
  let separatorFound = false
  let leadingZero = true
  for (let i = 0; i < value.length; i++) {
    if ((value[i] === '0' && leadingZero) || value[i] === ',') {
      continue
    }
    if (value[i] === '.') {
      separatorFound = true
      if (digitsFound >= SIGNIFICANT_DIGITS) {
        return value.substring(0, i)
      }
      continue
    }
    if (value[i] !== '0') {
      leadingZero = false
    }
    if (!leadingZero) {
      digitsFound++
      if (separatorFound && digitsFound >= SIGNIFICANT_DIGITS) {
        return value.substring(0, i + 1)
      }
    }
  }
  return value
}
