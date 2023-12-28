import { ethers } from 'hardhat'
import { expect } from 'chai'

describe('Token contract', function () {
  it('Deployment should set name and symbol', async function () {
    const tokenName = 'GM Token'
    const tokenSymbol = 'GMT'

    const tokenFactory = await ethers.getContractFactory('Token')
    const token = await tokenFactory.deploy(tokenName, tokenSymbol)
    await token.waitForDeployment()

    expect(await token.name()).to.equal(tokenName)
    expect(await token.symbol()).to.equal(tokenSymbol)
  })
})
