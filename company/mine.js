const {getEmailAddresses} = require('../crawler')

const forEmails = async (company, maxDepth=3) => {
  if (company.properties && company.properties.website && company.properties.website.value) {
    const results = await getEmailAddresses(company.properties.website.value, maxDepth)
    const emails = results.emailAddresses.map((email) => email.trim())
    company.properties.mined_emails = { value: emails.join(' ') }
  }

  return company
}

module.exports.forEmails = forEmails
