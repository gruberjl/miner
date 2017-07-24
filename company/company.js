const {find, query} = require('./read.js')

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
}

module.exports = Company
