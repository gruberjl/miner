const {find, query} = require('./read.js')

class Company {
  constructor(data) {
    this.data = data
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
}

module.exports = Company
