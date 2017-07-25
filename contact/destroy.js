const key = require('../env.js').HUBSPOT_KEY()
var request = require('request-promise');

const destroy = async (vid) => {
  const results = await request({
    method: 'delete',
    url: `https://api.hubapi.com/contacts/v1/contact/vid/${vid}?hapikey=${key}`,
    json: true
  })
  
  return results
}

module.exports.destroy = destroy
