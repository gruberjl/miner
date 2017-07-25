const Company = require('./company')

let company = {
  properties: {
    name: {value: 'test company'},
    description: {value: 'this is my test company'},
    website: {value: 'gitbit.org'}
  }
}

const worker = async () => {
  let c = await Company.create(company)
  c.properties.country = {value: 'USA'}
  c = await Company.update(c)
  c = await Company.destroy(c)
  console.log(c)
}

worker()
