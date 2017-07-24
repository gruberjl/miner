const Company = require('./company.js')

describe("company", () => {
  describe("class", () => {
    test('find', async () => {
      const company = await Company.find(499751277)
      expect(company).toBeInstanceOf(Company)
    })

    test('query', async () => {
      const companies = await Company.query(['name'], 1)
      expect(companies.length).toEqual(1)
      expect(companies[0]).toBeInstanceOf(Company)
    })

    test('constructor', () => {
      const company = new Company({a:1})
      expect(company).toBeInstanceOf(Company)
      expect(company.data).toEqual({a:1})
    })
  })
})
