const addMatchedFormula = (matchedFormulas, guess) => {
  const formula = guess.formula
  if (!matchedFormulas[formula])
    matchedFormulas[formula] = 0

  matchedFormulas[formula] = matchedFormulas[formula] + 1
  return matchedFormulas
}

const getCompanyFormula = (matchedFormulas) => {
  let topFormula = ''
  let value = 0

  Object.keys(matchedFormulas).forEach((key) => {
    if (matchedFormulas[key] > value)
      topFormula = key
  })

  return topFormula
}

const match = (employees, emailAddresses) => {
  let matchedFormulas = {}
  const emails = emailAddresses.map((email) => email.toLowerCase())

  employees.forEach((employee) => {
    const matchedGuesses = employee.email_guesses.filter((guess) => emails.includes(guess.value.toLowerCase()))

    if (matchedGuesses.length === 1) {
      matchedFormulas = addMatchedFormula(matchedFormulas, matchedGuesses[0])
      employee.email = matchedGuesses[0].value.toLowerCase()
    }
  })

  return {
    formula: getCompanyFormula(matchedFormulas),
    employees
  }
}

module.exports.match = match
