const key = require('../env.js').HUBSPOT_KEY()
var request = require('request-promise');

const create = async (properties) => {
  const results = await request({
    method: 'post',
    url: `https://api.hubapi.com/contacts/v1/contact?hapikey=${key}`,
    json: true,
    body: { properties }
  })

  return results
}

const update = async (vid, properties) => {
  const results = await request({
    method: 'post',
    url: `https://api.hubapi.com/contacts/v1/contact/vid/${vid}/profile?hapikey=${key}`,
    json: true,
    body: { properties }
  })

  return results
}

module.exports.create = create
module.exports.update = update
