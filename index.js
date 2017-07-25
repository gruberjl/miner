const Company = require('./company')
const linkedin = require('./linkedin')

const ShawFishmanId = 483315943

const mineCompany = async (company) => {
  if (company.properties.linkedin_company_page && company.properties.linkedin_company_page.value) {
    const profile = await linkedin.getCompany(company.properties.linkedin_company_page.value)
    console.log(profile)
  }
}

const worker = async (companyId) => {
  await linkedin.login()
  let c = await Company.find(companyId)
  c = await mineCompany(c)

  await linkedin.quit()
}

worker(ShawFishmanId)
