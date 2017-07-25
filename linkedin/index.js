var webdriver = require('selenium-webdriver')
var driver = new webdriver.Builder().forBrowser('chrome').build();
const {By, until, Key} = webdriver
const env = require('./env.js')

exports.login = async () => {
  driver.get('https://www.linkedin.com');
  var emailEl = driver.findElement(By.id('login-email'))
  var passEl = driver.findElement(By.id('login-password'))
  emailEl.sendKeys(env.LINKEDIN_EMAIL())
  passEl.sendKeys(env.LINKEDIN_PASSWORD())
  return emailEl.submit().then(() => {
    return driver.getTitle().then(function(title) {
      return {
        isLoggedIn: title == "LinkedIn",
        driver
      }
    })
  });
}

const getCompanyFollowersCount = () => {
  var followersEl = driver.findElement(By.className('org-top-card-module__followers-count'))
  return followersEl.getText().then((text) => {
    return text.split("\n")[1].split(' ')[0]
  })
}

const getCompanyEmployeeName = (el) =>
  el.findElement(By.className("name")).then((nameEl) => nameEl.getText()).catch(() => "")

const getCompanyEmployeeTitle = (el) => el.findElement(By.className("subline-level-1")).then((titleEl) => titleEl.getText())
const getCompanyEmployeeLocation = (el) => el.findElement(By.className("subline-level-2")).then((locationEl) => locationEl.getText())
const getCompanyEmployeeLink = (el) => el.findElement(By.className("search-result__result-link"))
  .then((linkEl) => linkEl.getAttribute('href'))

const getCompanyEmployee = (el) =>
  getCompanyEmployeeName(el).then(
    (name) => getCompanyEmployeeTitle(el).then(
      (title) => getCompanyEmployeeLocation(el).then(
        (location) => getCompanyEmployeeLink(el).then(
          (link) => ({name, title, location, link})
        )
      )
    )
  )

const getCompanyEmployeesPage = async (companyId, page=1) => {
  const people = []

  await driver.get(`https://www.linkedin.com/search/results/people/?facetCurrentCompany=${companyId}&page=${page}`)
  await driver.wait(until.elementLocated(By.className("search-result__wrapper")), 3000)
  await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)')
  await driver.sleep(500)
  const els = await driver.findElements(By.className("search-result__wrapper"))

  for (var i = 0; i < els.length; i++) {
    let person = await getCompanyEmployee(els[i])
    people.push(person)
  }

  let hasAnotherPage = true
  try {
    await driver.findElement(By.className("next"))
  } catch(e) {
    hasAnotherPage = false
  }

  return {people, hasAnotherPage}
}

exports.getCompanyEmployees = (companyId) => new Promise((res, rej) => {
  let page = 1
  let people = []

  const complete = () => res({people})

  const getter = () => {
    getCompanyEmployeesPage(companyId, page).then((results) => {
      page++
      people = people.concat(results.people)
      if (results.hasAnotherPage) {
        getter()
      } else {
        complete()
      }
    })
  }

  getter()
})

const getCompanyInfo = () => {
  const results = {}

  return driver.getTitle()
    .then((title) => results.title = title)
    .then(() => getCompanyFollowersCount().then((followersCount) => results.followersCount = followersCount))
    .then(() => driver.getCurrentUrl().then((url) => results.url = url))
    .then(() => results.companyId = getCompanyId(results.url))
    .then(() => exports.getCompanyEmployees(results.companyId).then(({people}) => results.people = people))
    .then(() => results)
}

const getCompanyId = (companyUrl) => companyUrl.split("/")[4]

exports.getCompany = (url) => {
  driver.get(url)
  return driver.wait(until.elementLocated(By.className("org-top-card-module__name")), 3000)
    .then(() => getCompanyInfo())
}

exports.driver = () => driver
exports.webdriver = () => webdriver
exports.quit = () => driver.quit()
