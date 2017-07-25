const nameParser = require('./index.js')

const tests = [
  {prefix: "", first: "john", last: "doe", middle: "", suffix: "", original: "john doe"},
  {prefix: "mr.", first: "john", last: "doe", middle: "lambert", suffix: "jr", original: "mr. john lambert doe jr"},
]

test('parses names properly', () => {
  tests.forEach((tester) => {
    expect(nameParser.parse(tester.original)).toEqual(tester)
  })
});
