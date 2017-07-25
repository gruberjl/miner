
module.exports.parse = require('./lib/parser');

/* example
const parser = (people) => {
  var humanname = require('./name-parser');

  people.forEach((person) => {
    console.log(humanname.parse(person.name))
  })
}
*/

/* example results

{ salutation: 'Mr.',
  firstName: 'john',
  initials: 'L',
  lastName: 'gruber',
  suffix: 'Jr' }

*/
