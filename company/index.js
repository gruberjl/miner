const write = require('./write.js')
const {find, query} = require('./read.js')
const destroyer = require('./destroy.js')

const isNew = (company) => !Boolean(company.companyId)

const hubspotProperties = (company) =>
  Object.keys(company.properties).reduce((arr, key) => {
    if (key === 'hs_lastmodifieddate' || key === 'createdate' )
      return arr

    arr.push({name:key, value:company.properties[key]})
    return arr
  }, [])

const create = async (company) => {
  try {
    company = await write.create(hubspotProperties(company))
  } catch(e) {
    company.error = e
  }

  return company
}

const update = async (company) => {
  try {
    company = await write.update(company.companyId, hubspotProperties(company))
  } catch(e) {
    company.error = e
  }

  return company
}

const destroy = async (company) => {
  try {
    await destroyer.destroy(company.companyId)
    company.isDeleted = true
  } catch(e) {
    company.error = e
  }

  return company
}

module.exports = {isNew, hubspotProperties, create, update, destroy, find, query}
