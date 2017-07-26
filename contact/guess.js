const debug = require('debug')('guess')

module.exports.guess = (domain, firstName, middleName, lastName) => {
  let g = []

  if (firstName) {
    g.push({value: `${firstName}@${domain}`, formula:"first"})
  }

  if (lastName) {
    g.push({value: `${lastName}@${domain}`, formula:"last"})
  }

  if (Boolean(firstName) && Boolean(lastName)) {
    g = [].concat(g, [
      {value: `${firstName}${lastName}@${domain}`, formula:"firstlast"},
      {value: `${firstName}.${lastName}@${domain}`, formula:"first.last"},
      {value: `${firstName.charAt(0)}${lastName}@${domain}`, formula:"flast"},
      {value: `${firstName.charAt(0)}.${lastName}@${domain}`, formula:"flast"},
      {value: `${firstName}${lastName.charAt(0)}@${domain}`, formula:"firstl"},
      {value: `${firstName}.${lastName.charAt(0)}@${domain}`, formula:"first.l"},

      {value: `${lastName}${firstName}@${domain}`, formula:"lastfirst"},
      {value: `${lastName}.${firstName}@${domain}`, formula:"last.first"},
      {value: `${lastName.charAt(0)}${firstName}@${domain}`, formula:"lfirst"},
      {value: `${lastName.charAt(0)}.${firstName}@${domain}`, formula:"l.first"},
      {value: `${lastName}${firstName.charAt(0)}@${domain}`, formula:"lastf"},
      {value: `${lastName}.${firstName.charAt(0)}@${domain}`, formula:"last.f"}
    ])
  }

  if (firstName && lastName && middleName) {
    g.push({value: `${firstName.charAt(0)}${middleName.charAt(0)}${lastName}@${domain}`, formula:"fmlast"})
    g.push({value: `${firstName}.${middleName.charAt(0)}.${lastName}@${domain}`, formula:"first.m.last"})
    g.push({value: `${firstName}.${middleName.charAt(0)}.${lastName}@${domain}`, formula:"firstmlast"})
    g.push({value: `${firstName}${middleName}${lastName}@${domain}`, formula:"firstmiddlelast"})
    g.push({value: `${firstName}.${middleName}.${lastName}@${domain}`, formula:"first.middle.last"})
  }

  return g
}

const match = (guesses, emails) => guesses.find((guess) => emails.includes(guess.value.toLowerCase()))

module.exports.match = match

const find = (employee, companyFormula) => {
  const results = employee.email_guesses.find((guess) => guess.formula == companyFormula)
  if (results && results.value)
    employee.email = employee.email_guesses.find((guess) => guess.formula == companyFormula).value
  return employee
}

module.exports.find = find

module.exports.findEach = (company) => {
  debug(`findEach starting. email_forumula:${company.email_forumula}`)
  company.employees.forEach((employee) => {
    if (!employee.email) {
      debug(`Finding: ${employee.name.original}`)
      find(employee, company.email_forumula)
      debug(`     Found: ${employee.email}`)
    }
  })

  return company
}
