const {create} = require('./write.js')
const {destroy} = require('./destroy.js')

describe('contact:destroy', () => {
  let destroyResults

  beforeAll(async () => {
    const properties = [
      {property: "firstname", value: "Test"},
      {property: 'lastname', value: 'Destroy'},
      {property: 'email', value: 'test.destroy@gitbit.org'}
    ]
    const createResults = await create(properties)
    destroyResults = await destroy(createResults.vid)
  })

  describe('destroy', () => {
    test('should have vid', async () => {
      expect(typeof destroyResults.vid).toEqual('number')
    })

    test('should have deleted', async () => {
      expect(destroyResults.deleted).toEqual(true)
    })
  })
})
