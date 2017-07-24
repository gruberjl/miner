const key = require('../env.js').HUBSPOT_KEY()
var request = require('request-promise');

const create = async (properties) => {
  const results = await request({
    method: 'post',
    url: `https://api.hubapi.com/companies/v2/companies?hapikey=${key}`,
    json: true,
    body: { properties }
  })

  return results
}

const update = async (companyId, properties) => {
  const results = await request({
    method: 'put',
    url: `https://api.hubapi.com/companies/v2/companies/${companyId}?hapikey=${key}`,
    json: true,
    body: { properties }
  })

  return results
}

module.exports.create = create
module.exports.update = update
