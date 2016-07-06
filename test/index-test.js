const expect = require('expect') 
const fs = require('fs')
const jsdom = require('mocha-jsdom')
const path = require('path') 

describe('index', () => {
  jsdom({
    src: fs.readFileSync(path.resolve(__dirname, '..', 'index.js'), 'utf-8')
  })

  it('runs', () => {
    expect(true).toEqual(true)
  })
})
