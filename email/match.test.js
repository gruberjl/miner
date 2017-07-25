const {match} = require('./match.js')
const {employees, crawledEmails} = require('./match.demodata.js')

describe('match', () => {
  test('should match', () => {
    const results = match(employees, crawledEmails)
    expect(results.formula).toEqual('flast')
    expect(results.employees[0].email).toEqual('jdarby@shawfishman.com')
  })
})
