const Company = require('./index.js')

describe("company-index", () => {
  describe('isNew', () => {
    test('should return false if we have a companyId', () => {
      expect(Company.isNew({companyId:1})).toEqual(false)
    })

    test('should return true if we dont have a companyId', () => {
      expect(Company.isNew({})).toEqual(true)
    })
  })

  describe('hubspotProperties', () => {
    test('should return properties in array', () => {
      const company = { properties: {
        name: { value: 'test company:company:class' }
      }}
      expect(Company.hubspotProperties(company)).toEqual([{name:'name', value:'test company:company:class'}])
    })

    test('should skip CALCULATED', () => {
      const company = { properties: {
        name: { value: 'test company:company:class' },
        created: { value: '1', source:'CALCULATED' },
      }}
      expect(Company.hubspotProperties(company)).toEqual([{name:'name', value:'test company:company:class'}])
    })
  })

  xdescribe('CreateUpdate', () => {
    let company

    beforeAll(async () => {
      company = await Company.create({
        properties: {
          name: {value:'Test Company:index'},
          description: {value:'This is a test company for company:write. Please delete if seen.'}
        }
      })
    })

    afterAll(async () => {
      await Company.destroy(company.companyId)
    })

    describe('create', () => {
      test('should have companyId', async () => {
        expect(typeof company.companyId).toEqual('number')
      })

      test('should have companyId', async () => {
        expect(typeof company.properties).toEqual('object')
      })
    })

    describe('update', () => {
      test('should update', async () => {
        company.properties.description.value = 'Test company. Please delete'
        const results = await Company.update(company)
        expect(results.properties.description.value).toEqual('Test company. Please delete')
      })
    })
  })

  xdescribe('destroy', () => {
    let company

    beforeAll(async () => {
      company = await Company.create({
        properties: {
          name: {value: 'Test Company:index'},
          description: {value:'This is a test company for company:write. Please delete if seen.'}
        }
      })
    })

    test('should delete', async () => {
      company = await Company.destroy(company)
      expect(company.isDeleted).toEqual(true)
      expect(company.error).toEqual(undefined)
    })
  })
})
