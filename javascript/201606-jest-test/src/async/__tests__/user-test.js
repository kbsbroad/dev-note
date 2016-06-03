jest.unmock('../user');

import * as user from '../user';

describe('async tests', () => {
  // The promise that is being tested should be returned.
  it('works with promises', () => {
    return user.getUserName(5)
      .then(name => expect(name).toEqual('Paul'));
  });

  it('works with async/await', async () => {
    const userName = await user.getUserName(4);
    expect(userName).toEqual('Mark');
  });

  it('tests error with promises', () => {
    return user.getUserName(3)
      .catch(e => expect(e).toEqual({
        error: 'User with 3 not found.',
      }));
  });

  // Or try-catch.
  it('tests error with async/await', async () => {
    try {
      await user.getUserName(2);
    } catch (object) {
      expect(object.error).toEqual('User with 2 not found.');
    }
  });
});
