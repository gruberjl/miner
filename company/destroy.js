const key = require('../env.js').HUBSPOT_KEY()
var request = require('request-promise');

const destroy = async (companyId) => {
  const results = await request({
    method: 'delete',
    url: `https://api.hubapi.com/companies/v2/companies/${companyId}?hapikey=${key}`,
    json: true
  })

  return results
}

module.exports.destroy = destroy
