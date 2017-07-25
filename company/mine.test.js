const mine = require('./mine.js')
const {find} = require('./index.js')

describe('mine.forEmails', () => {
  test('fail gracefully', async () => {
    const results = await mine.forEmails({})
    expect(results).toEqual({})
  })

  test('should populate mined_emails', async () => {
    const results = await mine.forEmails({properties:{website:{value:'http://www.shawfishman.com/lawyers/terence-g-banich/'}}}, 1)
    expect(results).toEqual({
      properties: {
        mined_emails: {value: 'tbanich@shawfishman.com info@shawfishman.com'},
        website: {value: "http://www.shawfishman.com/lawyers/terence-g-banich/"}
      }
    })
  })
})
