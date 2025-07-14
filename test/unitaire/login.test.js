const login = require('../../javascript/auth.js');

test('tester avec un bon email et un bon mot de passe', () => {
  const result = login('test@test.com', '1234');
  expect(result).toBe(true);
});

test('tester avec un mauvais email', () => {
    const result = login('admin@test', '1234');
    expect(result).toBe(false);
});

test('tester avec un mauvais mot de passe', () => {
    const result = login('test@test.com', 'wrongpassword');
    expect(result).toBe(false);

});
test('tester avec un mauvais email et un mauvais mot de passe', () => {
    const result = login('admin@test', 'wrongpassword');
    expect(result).toBe(false);
});
test('tester avec un email vide', () => {
    const result = login('', '1234');
    expect(result).toBe(false);
})
test('tester avec un mot de passe vide', () =>{
    const result = login('test@test.com', '');
    expect(result).toBe(false);
});
test('tester avec un email et un mot de passe vides', () => {
    const result = login('', '');
    expect(result).toBe(false);
});

test('tester avec un email avec des espaces', () => {
    const result = login('tome 1 @test.com', '1234');
    expect(result).toBe(false);
});
test('tester avec un mot de passe avec des espaces', () => {
    const result = login('test@test.com', ' 1234 ');
    expect(result).toBe(false);
});
test('tester avec un email et un mot de passe avec des espaces', () => {
    const result = login('test @test.com', ' 1234 ');
    expect(result).toBe(false);
});

test('tester avec un email invalide', () => {
const result = login('test@.com', '1234');
expect(result).toBe(false);
});
test('tester avec un mot de passe trop court', () => {
    const result = login('test @test.com', '123');
    expect(result).toBe(false);
});

test ('tester avec un email et un mot de passe trop court', () => {
    const result = login('123@tt.com', '12');
    expect(result).toBe(false);

});
test('tester avec un email et un mot de passe trop long', () => {
    const result = login('file:///C:/Users/brich/OneDrive/Documents/FORMATION/exemple%20pour%20moi/test-ecommerce/index.html?showCart=true@test.com','1234567890123456789012345678901234567890');
    expect(result).toBe(false);
});
test('tester avec un email et un mot de passe spéciaux', () => {
    const result = login('++++++""";;;@test.com', '1234!@#$%^&*()');
    expect(result).toBe(false);
});

test('tester avec un email et un mot de passe avec des caractères spéciaux', () => {
 const result = login('0..........@0000.00', '0.0."("("')
    expect(result).toBe(false);
});
test ('tester avec un email sans @', () => {
    const result = login('testtest.com', '1234');
    expect(result).toBe(false);
});
test('tester avec un mot de passe sans chiffres', () => {
    const result = login('testtest.com', 'password');
    expect(result).toBe(false);
});
test('tester avec un email sans domaine', () => {
    const result = login('test@', '1234');
    expect(result).toBe(false);
});

test('tester avec un email avec un domaine invalide', () => {
    const result = login('test@test', '1234');
    expect(result).toBe(false);
});
test('tester avec un email avec un domaine trop long', () => {
    const result = login('file:///C:/Users/brich/OneDrive/Documents/FORMATION/exemple%20pour%20moi/test-ecommerce/index.html?showCart=true@test.com','1234');
    expect(result).toBe(false);
});
test('tester avec un mot de passe avec des caractères spéciaux', () => {
    const result = login('testtest.com','1234!@#$%^&*()');
    expect(result).toBe(false);
});
test('tester avec un email avec des caractères spéciaux', () => { 
    const result = login('test@!#$%^&*()test.com', '1234');
    expect(result).toBe(false);
});