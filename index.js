const Company = require('./company')
const linkedin = require('./linkedin')
const {getEmailAddresses} = require('./crawler')
const nameParser = require('./name-parser')

const ShawFishmanId = 483315943

const mineCompany = async (company) => {
  company = await Company.mine.forEmails(company, 3)

  if (company.properties.linkedin_company_page && company.properties.linkedin_company_page.value) {
    company.linked_profile = await linkedin.getCompany(company.properties.linkedin_company_page.value)
    company.employees = company.linked_profile.people
      .map((person) => Object.assign({}, person, {name: nameParser.parse(person.name)}))
      .filter((employee) => Boolean(employee.name) && employee.name.original !== '')
  }

  console.log(company)
}

const worker = async (companyId) => {
  await linkedin.login()
  let c = await Company.find(companyId)
  c = await mineCompany(c)

  await linkedin.quit()
}

worker(ShawFishmanId)
