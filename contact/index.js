const write = require('./write.js')
const {find, query} = require('./read.js')
const destroyer = require('./destroy.js')
const nameParser = require('another-name-parser')
const Guess = require('./guess.js')

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

const parseName = (contact, originalName) => {
  const name = nameParser(originalName)
  contact.properties.name_prefix = {value: name.prefix}
  contact.properties.firstname = {value: name.first}
  contact.properties.name_middle = {value: name.middle}
  contact.properties.lastname = {value: name.last}
  contact.properties.name_suffix = {value: name.suffix}
  contact.properties.name_original = {value: name.original}
  return contact
}

const guessEmails = (contact, domain) => {
  const firstName =   contact.properties.firstname    ? contact.properties.firstname.value    : null
  const middleName =  contact.properties.name_middle  ? contact.properties.name_middle.value  : null
  const lastName =    contact.properties.lastname     ? contact.properties.lastname.value     : null
  contact.properties.email_guesses = {
    value: Guess.guess(domain, firstName, middleName, lastName),
    source: 'CALCULATED'
  }
  return contact
}

const matchEmails = (contact, emails) => {
  const guess = Guess.match(contact.properties.email_guesses.value, emails)
  if (guess) {
    contact.properties.email = {value: guess.value}
    contact.properties.email_formula = {value: guess.formula}
  }

  return contact
}

const findEmailByFormula = (contact, formula) => {
  const guess = Guess.findByFormula(contact.properties.email_guesses.value, formula)
  if (guess) {
    contact.properties.email = {value: guess.value}
    contact.properties.email_formula = {value: guess.formula}
  }

  return contact
}

module.exports = {isNew, hubspotProperties, create, update, destroy, find, query, parseName, guessEmails, matchEmails, findEmailByFormula}
