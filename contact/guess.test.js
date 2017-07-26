const {guess, match} = require('./guess.js')

describe("guess", () => {
  describe('guess', () => {
    test('only first', () => {
      expect(guess('gitbit.org', 'john')).toEqual([{"formula": "first", "value": "john@gitbit.org"}])
    })

    test('first && last', () => {
      expect(guess('gitbit.org', 'john', null, 'gruber')).toEqual([
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
      expect(guess('gitbit.org', 'john', 'lambert', 'gruber')).toEqual([
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
})
