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

    test('create', async () => {
      const company = new Company({properties:{name:'test company:company:class'}})
      const results = await company.create()
      expect(typeof results.companyId).toEqual('number')
      expect(results.properties.name.value).toEqual('test company:company:class')
    })

    test('create failure', async () => {
      const company = new Company({properties:{title:'test company:company:class'}})
      const results = await company.create()
      expect(results.statusCode).toEqual(400)
    })
  })

  describe("non-hubspot", () => {
    describe('constructor', () => {
      test('constructor', () => {
        const company = new Company({a:1})
        expect(company).toBeInstanceOf(Company)
        expect(company.data).toEqual({a:1})
      })

      test('should set data to {properties:{}}', () => {
        const company = new Company()
        expect(company.data).toEqual({properties:{}})
      })
    })

    describe('hubspotProperties', () => {
      test('should return properties in array', () => {
        const company = new Company({properties:{name:'test company:company:class'}})
        expect(company.hubspotProperties).toEqual([{name:'name', value:'test company:company:class'}])
      })

      test('should remove hs_lastmodifieddate', () => {
        const company = new Company({properties:{name:'test company:company:class', hs_lastmodifieddate:'adsf'}})
        expect(company.hubspotProperties).toEqual([{name:'name', value:'test company:company:class'}])
      })

      test('should remove createdate', () => {
        const company = new Company({properties:{name:'test company:company:class', createdate:'adsf'}})
        expect(company.hubspotProperties).toEqual([{name:'name', value:'test company:company:class'}])
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

    describe('setField', () => {
      test('should set value in data', () => {
        const company = new Company()
        company.setField('name', 'Company Title')
        expect(company.data.properties).toEqual({name:'Company Title'})
      })
    })


  })
})
