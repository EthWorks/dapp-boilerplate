import { expect } from 'chai'
import { balanceOf, ethBalanceOf, multicall } from '../../../src/providers/chainState/multicall'
import { InfuraProvider } from '@ethersproject/providers'
import { AddressZero } from '@ethersproject/constants'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from '../../../src/constants'
import { Dai } from '../../../src/constants/currencies'

export const INFURA_PROJECT_ID = 'c969a07b244d4e37a7b8c4b6262187e4'

describe('multicall', () => {
  it('can query multiple contracts at once', async () => {
    const provider = new InfuraProvider('mainnet', INFURA_PROJECT_ID)
    const blockNumber = await provider.getBlockNumber()

    const result = await multicall(provider, ChainId.Mainnet, blockNumber, [
      ethBalanceOf(ChainId.Mainnet, AddressZero),
      balanceOf(Dai.address, AddressZero),
    ])

    expect(result.length).to.equal(2)
    expect(result[0]).to.be.instanceOf(BigNumber)
    expect(result[0].gt(0)).to.be.true
    expect(result[1]).to.be.instanceOf(BigNumber)
    expect(result[1].gt(0)).to.be.true
  })
})
