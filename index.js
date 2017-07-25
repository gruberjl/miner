const Company = require('./company')
//const linkedin = require('./linkedin')

const mineCompany = async (companyId) => {
  const company = await Company.find(companyId)

  Object.keys(company.properties).forEach((key) => {
    console.log(key)
    console.log(company.properties[key])
    console.log('')
  })
}

mineCompany(483315943)
