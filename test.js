'use strict'

const getChromePath = require('./lib/@simple_merchant/aws-lambda-chrome')({
  path: '/tmp'
})
describe('aws-lambda-chrome', () => {
  it('getChromePath', async () => {
    const path = await getChromePath()
    expect(path).toEqual('/tmp/headless_shell')
  })
})
