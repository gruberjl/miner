const {guess, match, find, findEach} = require('./guess.js')

const employees = () => [
  { name:
   { prefix: '',
     first: 'Johnna',
     middle: '',
     last: 'Darby',
     suffix: '',
     original: 'Johnna Darby' },
  title: 'Business Counselor at Shaw Fishman Glantz & Towbin LLC',
  location: 'Greater Philadelphia Area',
  link: 'https://www.linkedin.com/in/johnnadarby/',
  email_guesses:
   [ { value: 'Johnna@shawfishman.com', formula: 'first' },
     { value: 'Darby@shawfishman.com', formula: 'last' },
     { value: 'JohnnaDarby@shawfishman.com', formula: 'firstlast' },
     { value: 'Johnna.Darby@shawfishman.com', formula: 'first.last' },
     { value: 'JDarby@shawfishman.com', formula: 'flast' },
     { value: 'J.Darby@shawfishman.com', formula: 'flast' },
     { value: 'JohnnaD@shawfishman.com', formula: 'firstl' },
     { value: 'Johnna.D@shawfishman.com', formula: 'first.l' },
     { value: 'DarbyJohnna@shawfishman.com', formula: 'lastfirst' },
     { value: 'Darby.Johnna@shawfishman.com', formula: 'last.first' },
     { value: 'DJohnna@shawfishman.com', formula: 'lfirst' },
     { value: 'D.Johnna@shawfishman.com', formula: 'l.first' },
     { value: 'DarbyJ@shawfishman.com', formula: 'lastf' },
     { value: 'Darby.J@shawfishman.com', formula: 'last.f' } ],
  email: 'jdarby@shawfishman.com' },
  { name:
   { prefix: '',
     first: 'Carlene',
     middle: '',
     last: 'Gordon',
     suffix: '',
     original: 'Carlene Gordon' },
  title: 'Litigation Paralegal/Litigation Support Specialist at Shaw Fishman Glantz & Towbin LLC',
  location: 'Greater Chicago Area',
  link: 'https://www.linkedin.com/in/carlene-gordon-5a215316/',
  email_guesses:
   [ { value: 'Carlene@shawfishman.com', formula: 'first' },
     { value: 'Gordon@shawfishman.com', formula: 'last' },
     { value: 'CarleneGordon@shawfishman.com', formula: 'firstlast' },
     { value: 'Carlene.Gordon@shawfishman.com',
       formula: 'first.last' },
     { value: 'CGordon@shawfishman.com', formula: 'flast' },
     { value: 'C.Gordon@shawfishman.com', formula: 'flast' },
     { value: 'CarleneG@shawfishman.com', formula: 'firstl' },
     { value: 'Carlene.G@shawfishman.com', formula: 'first.l' },
     { value: 'GordonCarlene@shawfishman.com', formula: 'lastfirst' },
     { value: 'Gordon.Carlene@shawfishman.com',
       formula: 'last.first' },
     { value: 'GCarlene@shawfishman.com', formula: 'lfirst' },
     { value: 'G.Carlene@shawfishman.com', formula: 'l.first' },
     { value: 'GordonC@shawfishman.com', formula: 'lastf' },
     { value: 'Gordon.C@shawfishman.com', formula: 'last.f' } ] }
]

const name = (x) => {
  let y = {}
  if (x>0) y.first = 'john'
  if (x>1) y.last = 'gruber'
  if (x>2) y.middle = 'lambert'

  return y
}

describe("guess", () => {
  describe('guess', () => {
    test('only first', () => {
      expect(guess('gitbit.org', name(1), '')).toEqual([{"formula": "first", "value": "john@gitbit.org"}])
    })

    test('first && last', () => {
      expect(guess('gitbit.org', name(2), '')).toEqual([
        {"formula": "first", "value": "john@gitbit.org"},
        {"formula": "last", "value": "gruber@gitbit.org"},
        {"formula": "firstlast", "value": "johngruber@gitbit.org"},
        {"formula": "first.last", "value": "john.gruber@gitbit.org"},
        {"formula": "flast", "value": "jgruber@gitbit.org"},
        {"formula": "flast", "value": "j.gruber@gitbit.org"},
        {"formula": "firstl", "value": "johng@gitbit.org"},
        {"formula": "first.l", "value": "john.g@gitbit.org"},
        {"formula": "lastfirst", "value": "gruberjohn@gitbit.org"},
        {"formula": "last.first", "value": "gruber.john@gitbit.org"},
        {"formula": "lfirst", "value": "gjohn@gitbit.org"},
        {"formula": "l.first", "value": "g.john@gitbit.org"},
        {"formula": "lastf", "value": "gruberj@gitbit.org"},
        {"formula": "last.f", "value": "gruber.j@gitbit.org"}
      ])
    })

    test('first && last && middle', () => {
      expect(guess('gitbit.org', name(3), '')).toEqual([
        {"formula": "first", "value": "john@gitbit.org"},
        {"formula": "last", "value": "gruber@gitbit.org"},
        {"formula": "firstlast", "value": "johngruber@gitbit.org"},
        {"formula": "first.last", "value": "john.gruber@gitbit.org"},
        {"formula": "flast", "value": "jgruber@gitbit.org"},
        {"formula": "flast", "value": "j.gruber@gitbit.org"},
        {"formula": "firstl", "value": "johng@gitbit.org"},
        {"formula": "first.l", "value": "john.g@gitbit.org"},
        {"formula": "lastfirst", "value": "gruberjohn@gitbit.org"},
        {"formula": "last.first", "value": "gruber.john@gitbit.org"},
        {"formula": "lfirst", "value": "gjohn@gitbit.org"},
        {"formula": "l.first", "value": "g.john@gitbit.org"},
        {"formula": "lastf", "value": "gruberj@gitbit.org"},
        {"formula": "last.f", "value": "gruber.j@gitbit.org"},
        {"formula": "fmlast", "value": "jlgruber@gitbit.org"},
        {"formula": "first.m.last", "value": "john.l.gruber@gitbit.org"},
        {"formula": "firstmlast", "value": "john.l.gruber@gitbit.org"},
        {"formula": "firstmiddlelast", "value": "johnlambertgruber@gitbit.org"},
        {"formula": "first.middle.last", "value": "john.lambert.gruber@gitbit.org"}
      ])
    })
  })

  describe('match', () => {
    test('should return guess', () => {
      const results = match([{"formula": "first", "value": "john@gitbit.org"}], ['john@gitbit.org'])
      expect(results).toEqual({"formula": "first", "value": "john@gitbit.org"})
    })

    test('should not be case sensitive', () => {
      const results = match([{"formula": "first", "value": "John@gitbit.org"}], ['john@gitbit.org'])
      expect(results).toEqual({"formula": "first", "value": "John@gitbit.org"})
    })
  })

  describe('find', () => {
    test('should assign email', () => {
      expect(find(employees()[1], 'flast').email).toEqual('CGordon@shawfishman.com')
    })

    test('should not assign email', () => {
      expect(typeof find(employees()[1], 'NotAFormula').email).toEqual('undefined')
    })
  })

  describe('findEach', () => {
    test('should assign email', () => {
      const company = {
        employees: employees(),
        email_forumula: 'flast'
      }

      expect(findEach(company).employees[1].email).toEqual('CGordon@shawfishman.com')
    })

    test('should not assign email', () => {
      const company = {
        employees: employees(),
        email_forumula: 'NotAFormula'
      }

      expect(findEach(company).employees[0].email).toEqual('jdarby@shawfishman.com')
      expect(typeof findEach(company).employees[1].email).toEqual('undefined')
    })
  })
})
