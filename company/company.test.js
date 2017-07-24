const Company = require('./company.js')

describe("company:class", () => {
  xdescribe('hubspot', () => {
    test('find', async () => {
      const company = await Company.find(499751277)
      expect(company).toBeInstanceOf(Company)
    })

    test('query', async () => {
      const companies = await Company.query(['name'], 1)
      expect(companies.length).toEqual(1)
      expect(companies[0]).toBeInstanceOf(Company)
    })
  })

  describe("non-hubspot", () => {
    describe('constructor', () => {
      test('constructor', () => {
        const company = new Company({a:1})
        expect(company).toBeInstanceOf(Company)
        expect(company.data).toEqual({a:1})
      })

      test('should set data to {}', () => {
        const company = new Company()
        expect(company.data).toEqual({})
      })
    })


    describe("isNew", () => {
      test('should return false if we have a companyId', () => {
        const company = new Company({companyId:1})
        expect(company.isNew()).toEqual(false)
      })

      test('should return true if we dont have a companyId', () => {
        const company = new Company()
        expect(company.isNew()).toEqual(true)
      })
    })


  })
})
