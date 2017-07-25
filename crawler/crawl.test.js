const {getEmailAddresses} = require('./crawl.js')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000

describe('crawl', () => {
  test('getEmailAddresses', () => getEmailAddresses('http://www.shawfishman.com/lawyers/terence-g-banich/', 1).then((response) => {
    expect(response.statusCode).toEqual(200)
    expect(response.url).toEqual('http://www.shawfishman.com/lawyers/terence-g-banich/')
    expect(response.emailAddresses).toEqual(["tbanich@shawfishman.com", "info@shawfishman.com"])
  }))

  test('should dedupe results', () => getEmailAddresses('http://www.shawfishman.com/attorneys/', 2).then((response) => {
    expect(response.statusCode).toEqual(200)
    expect(response.url).toEqual('http://www.shawfishman.com/attorneys/')
    const emails = response.emailAddresses.filter((email) => email == 'info@shawfishman.com')
    expect(emails.length).toEqual(1)
  }))
})
