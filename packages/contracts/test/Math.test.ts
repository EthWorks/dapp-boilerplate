import { expect } from 'chai'
import { loadFixture } from 'ethereum-waffle'
import { mathFixture } from './fixtures'

describe('Math', () => {
  describe('Math.min', () => {
    it('returns the smaller value', async () => {
      const { math } = await loadFixture(mathFixture)
      expect(await math.min(1, 2)).to.equal(1)
      expect(await math.min(1000, 400)).to.equal(400)
    })
  })
})
