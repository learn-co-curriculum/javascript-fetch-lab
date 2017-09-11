const expect = chai.expect;

describe('index.js', () => {
  it('does not commit token', () => {
    expect(getToken()).to.equal('')
  })

  describe('index.html', () => {
    it('creates a div with an id of "issues"', () => {
      expect(document.getElementById('issues')).to.exist
    })
  })

  describe('fetch functions', () => {
    let fetchSpy

    beforeEach(() => {
      fetchSpy = sinon.spy(window, "fetch")
    })

    afterEach(() => {
      fetchSpy.restore()
    })

    it('forkRepo fetches the create fork api', () => {
      forkRepo()
      const url = fetchSpy.args
      expect(url).to.match(/api.github.com\/repos\/learn-co-curriculum\/javascript-fetch-lab/)
      const opts = fetchSpy.args[0][1]
      expect(opts.method).to.match(/post/)
      expect(opts.headers).to.include(/Authorization: token\s./)
    })

    it('fetches the create issue api', () => {
      document.getElementById('title').value = "test"
      document.getElementById('body').value = "test body"

      createIssue()
      const url = fetchSpy.args
      expect(url).to.match(/javascript-fetch-lab\/issues/)
      expect(url).to.not.match(/learn-co-curriculum/)
      const opts = fetchSpy.args[0][1]
      expect(opts.method).to.match(/post/)
      expect(opts.headers).to.include(/Authorization: token\s./)
      expect(opts.body).to.match(/test body/)
    })

    it('fetches the get issues api', () => {
      getIssues()
      const url = fetchSpy.args
      expect(url).to.match(/javascript-fetch-lab\/issues/)
      expect(url).to.not.match(/learn-co-curriculum/)
    })
  })
})
