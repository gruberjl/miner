const write = require('./write.js')
const {find, query} = require('./read.js')
const destroyer = require('./destroy.js')

const isNew = (contact) => !Boolean(contact.vid)

const hubspotProperties = (contact) =>
  Object.keys(contact.properties).reduce((arr, key) => {
    if (contact.properties[key].source && contact.properties[key].source === 'CALCULATED' )
      return arr

    if (key === 'createdate')
      return arr

    arr.push({property:key, value:contact.properties[key].value})
    return arr
  }, [])

const create = async (contact) => {
  try {
    contact = await write.create(hubspotProperties(contact))
  } catch(e) {
    contact.error = e
  }

  return contact
}

const update = async (contact) => {
  try {
    await write.update(contact.vid, hubspotProperties(contact))
  } catch(e) {
    contact.error = e
  }

  return contact
}

const destroy = async (contact) => {
  try {
    await destroyer.destroy(contact.vid)
    contact.isDeleted = true
  } catch(e) {
    contact.error = e
  }

  return contact
}

module.exports = {isNew, hubspotProperties, create, update, destroy, find, query}
