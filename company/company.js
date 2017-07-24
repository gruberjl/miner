const {find, query} = require('./read.js')
const {create, update} = require('./write.js')

class Company {
  constructor(data) {
    if (data)
      this.data = data
    else
      this.data = {}
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

  async create() {
    const properties = Object.keys(this.data.properties).map((key) => {
      return {name:key, value:this.data.properties[key]}
    })

    let results

    try {
      results = await create(properties)
    } catch(e) {
      return e
    }

    this.data = results
    return results
  }
}

module.exports = Company
