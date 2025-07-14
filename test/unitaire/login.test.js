const login = require('../../javascript/auth.js');

test('tester avec un bon email et un bon mot de passe', () => {
  const result = login('test@test.com', '1234');
  expect(result).toBe(true);
});
