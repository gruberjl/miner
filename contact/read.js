const key = require('../env.js').HUBSPOT_KEY()
var request = require('request-promise');

const query = async (properties = [], limit = 250) => {
  const results = await request({
    method: 'get',
    url: `https://api.hubapi.com/contacts/v1/lists/all/contacts/all?hapikey=${key}&properties=${properties.join("&properties=")}&count=${limit}`,
    json: true
  })

  return results.contacts
}

const find = async (vid) => {
  const results = await request({
    method: 'get',
    url: `https://api.hubapi.com/contacts/v1/contact/vid/${vid}/profile?hapikey=${key}`,
    json: true
  })

  return results
}

module.exports.query = query
module.exports.find = find
