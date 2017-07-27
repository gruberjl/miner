const Contact = require('./index.js')

describe('Contact:Index', () => {
  describe('isNew', () => {
    test('should return false if we have a vid', () => {
      expect(Contact.isNew({vid:1})).toEqual(false)
    })

    test('should return true if we dont have a vid', () => {
      expect(Contact.isNew({})).toEqual(true)
    })
  })

  describe('hubspotProperties', () => {
    test('should return properties in array', () => {
      const contact = { properties: {
        name: { value: 'test contact' }
      }}
      expect(Contact.hubspotProperties(contact)).toEqual([{property:'name', value:'test contact'}])
    })

    test('should skip CALCULATED', () => {
      const contact = { properties: {
        name: { value: 'test contact' },
        created: { value: '1', source:'CALCULATED' },
      }}
      expect(Contact.hubspotProperties(contact)).toEqual([{property:'name', value:'test contact'}])
    })

    test('should skip createdate', () => {
      const contact = { properties: {
        name: { value: 'test contact' },
        createdate: { value: '1' },
      }}
      expect(Contact.hubspotProperties(contact)).toEqual([{property:'name', value:'test contact'}])
    })
  })

  describe('parseName', () => {
    test('should set name fields', () => {
      let contact = Contact.parseName({ properties:{}}, 'mr. John "sexy" L. Gruber, jr.')
      expect(contact.properties.name_prefix.value).toEqual('mr.')
      expect(contact.properties.firstname.value).toEqual('John')
      expect(contact.properties.name_middle.value).toEqual('L.')
      expect(contact.properties.lastname.value).toEqual('Gruber')
      expect(contact.properties.name_suffix.value).toEqual('jr.')
      expect(contact.properties.name_original.value).toEqual('mr. John "sexy" L. Gruber, jr.')
    })
  })

  describe('guessEmails', () => {
    test('should set guess', () => {
      const results = Contact.guessEmails({properties:{firstname:{value:'john'}}}, 'gitbit.org')
      expect(results.properties.email_guesses.value).toEqual([{formula:'first', value:'john@gitbit.org'}])
      expect(results.properties.email_guesses.source).toEqual('CALCULATED')
    })
  })

  describe('matchEmails', () => {
    test('should set email', () => {
      let contact = Contact.guessEmails({properties:{firstname:{value:'john'}}}, 'gitbit.org')
      contact = Contact.matchEmails(contact, ['john@gitbit.org'])
      expect(contact.properties.email.value).toEqual('john@gitbit.org')
      expect(contact.properties.email_formula.value).toEqual('first')
    })
  })

  xdescribe('crud', () => {
    let contact

    beforeAll(async () => {
      contact = await Contact.create({
        properties: {
          firstname:  {value: "Test"},
          lastname:   {value: 'Contact-Index'},
          email:      {value: 'test.contact.index@gitbit.org'}
        }
      })
    })

    afterAll(async () => {
      if (!contact.isDeleted)
        await Contact.destroy(contact)
    })

    describe('create', () => {
      test('should have vid', async () => {
        expect(typeof contact.vid).toEqual('number')
      })

      test('should have properties', async () => {
        expect(typeof contact.properties).toEqual('object')
      })
    })

    describe('update', () => {
      test('should update', async () => {
        contact.properties.lastname.value = 'Contact-Index2'
        const results = await Contact.update(contact)
        expect(results.properties.lastname.value).toEqual('Contact-Index2')
      })
    })

    describe('delete', () => {
      test('should delete', async () => {
        contact = await Contact.destroy(contact)
        expect(contact.isDeleted).toEqual(true)
        expect(contact.error).toEqual(undefined)
      })
    })
  })
})
