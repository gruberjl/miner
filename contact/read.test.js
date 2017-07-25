const {find, query} = require('./read.js')

describe('contact-read', () => {
  describe('query', () => {
    let contacts

    beforeAll(async () => {
      contacts = await query(['firstname'], 1)
    })

    test('should get contacts', async () => {
      expect(Array.isArray(contacts)).toEqual(true)
    })

    test('should filter properties', async () => {
      expect(contacts[0].properties).toEqual(expect.any(Object))
    })

    test('should limit number returned', async () => {
      expect(contacts.length).toEqual(1)
    })
  })

  describe('find', () => {
    test('should get company', async () => {
      const results = await find(351)
      expect(results.vid).toEqual(351)
      expect(results.properties.firstname.value).toEqual('Ira')
    })
  })
})
