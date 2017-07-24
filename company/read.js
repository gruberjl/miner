const key = require('../env.js').HUBSPOT_KEY()
var request = require('request-promise');

const query = async (properties = [], limit = 250) => {
  const results = await request({
    method: 'get',
    url: `https://api.hubapi.com/companies/v2/companies/paged?hapikey=${key}&properties=${properties.join("&properties=")}&limit=${limit}`,
    json: true
  })

  return results.companies
}

const find = async (companyId) => {
  const results = await request({
    method: 'get',
    url: `https://api.hubapi.com/companies/v2/companies/${companyId}?hapikey=${key}`,
    json: true
  })

  return results
}

module.exports.query = query
module.exports.find = find
