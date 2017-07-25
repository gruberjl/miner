const {create, update} = require('./write.js')
const {destroy} = require('./destroy.js')

describe('contact:write', () => {
  let createResults

  beforeAll(async () => {
    const properties = [
      {property: "firstname", value: "Test"},
      {property: 'lastname', value: 'Contact'},
      {property: 'email', value: 'test.contact@gitbit.org'}
    ]
    createResults = await create(properties)
  })

  afterAll(async () => {
    await destroy(createResults.vid)
  })

  describe('create', () => {
    test('should have vid', async () => {
      expect(typeof createResults.vid).toEqual('number')
    })

    test('should have properties', async () => {
      expect(typeof createResults.properties).toEqual('object')
    })
  })

  describe('update', () => {
    test('should update', async () => {
      const results = await update(createResults.vid, [{property:'firstname', value:'Test2'}])
      expect(typeof results).toEqual('undefined')
    })
  })
})
