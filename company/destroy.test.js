const {create} = require('./write.js')
const {destroy} = require('./destroy.js')

xdescribe('company:destroy', () => {
  let destroyResults

  beforeAll(async () => {
    const properties = [
      {name: "name",        value: "Test Company"},
      {name: 'description', value: 'This is a test company for company:destroy. Please delete if seen.'}
    ]
    const createResults = await create(properties)
    destroyResults = await destroy(createResults.companyId)
  })

  describe('destroy', () => {
    test('should have companyId', async () => {
      expect(typeof destroyResults.companyId).toEqual('number')
    })

    test('should have companyId', async () => {
      expect(destroyResults.deleted).toEqual(true)
    })
  })
})
