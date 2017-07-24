const {find, query} = require('./read.js')
const {create, update} = require('./write.js')

class Company {
  constructor(data) {
    if (data)
      this.data = data
    else
      this.data = {properties:{}}
  }

  static async find(companyId) {
    const data = await find(companyId)
    return new Company(data)
  }

  static async query(properties, limit) {
    const raw = await query(properties, limit)
    const companies = raw.map((data) => new Company(data))
    return companies
  }

  isNew() {
    return !Boolean(this.data.companyId)
  }

  get hubspotProperties() {
    return Object.keys(this.data.properties).reduce((arr, key) => {
      if (key === 'hs_lastmodifieddate' || key === 'createdate' )
        return arr

      arr.push({name:key, value:this.data.properties[key]})
      return arr
    }, [])
  }

  async create() {
    let results

    try {
      results = await create(this.hubspotProperties)
    } catch(e) {
      return e
    }

    this.data = results
    return results
  }

  setField(key, value) {
    this.data.properties[key] = value
  }

  set title(value) {
    this.field('title', value)
  }


}

module.exports = Company
