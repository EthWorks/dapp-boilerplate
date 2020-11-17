import { expect } from 'chai'
import { loadFixture } from 'ethereum-waffle'
import { tenCounterFixture } from './fixtures'

describe('TenCounter', () => {
  it('can increment up to ten', async () => {
    const { tenCounter } = await loadFixture(tenCounterFixture)
    expect(await tenCounter.value()).to.equal(0)
    await tenCounter.increment()
    expect(await tenCounter.value()).to.equal(1)
    await tenCounter.increment()
    await tenCounter.increment()
    await tenCounter.increment()
    await tenCounter.increment()
    await tenCounter.increment()
    await tenCounter.increment()
    await tenCounter.increment()
    await tenCounter.increment()
    expect(await tenCounter.value()).to.equal(9)
    await tenCounter.increment()
    expect(await tenCounter.value()).to.equal(10)
    await tenCounter.increment()
    expect(await tenCounter.value()).to.equal(10)
  })
})
