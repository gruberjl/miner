const {create, update} = require('./write.js')
const {destroy} = require('./destroy.js')

xdescribe('company:write', () => {
  let createResults

  beforeAll(async () => {
    const properties = [
      {name: "name",        value: "Test Company"},
      {name: 'description', value: 'This is a test company for company:write. Please delete if seen.'}
    ]
    createResults = await create(properties)
  })

  afterAll(async () => {
    await destroy(createResults.companyId)
  })

  describe('create', () => {
    test('should have companyId', async () => {
      expect(typeof createResults.companyId).toEqual('number')
    })

    test('should have companyId', async () => {
      expect(typeof createResults.properties).toEqual('object')
    })
  })

  describe('update', () => {
    test('should update', async () => {
      const results = await update(createResults.companyId, [{name:'description', value:'Test company. Please delete'}])
      expect(results.properties.description.value).toEqual('Test company. Please delete')
    })
  })
})
