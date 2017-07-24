const {find, query} = require('./read.js')

xdescribe('company:read', () => {
  describe('query', () => {
    let companies

    beforeAll(async () => {
      companies = await query(['name'], 1)
    })

    test('should get companies', async () => {
      expect(Array.isArray(companies)).toEqual(true)
    })

    test('should filter properties', async () => {
      expect(companies[0].properties).toEqual({name: expect.any(Object)})
    })

    test('should limit number returned', async () => {
      expect(companies.length).toEqual(1)
    })
  })

  describe('find', () => {
    test('should get company', async () => {
      const results = await find(499751277)
      expect(results.companyId).toEqual(499751277)
      expect(results.properties.name.value).toEqual('GitBit')
    })
  })
})
