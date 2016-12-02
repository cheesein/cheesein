const assert = require('chai').assert;
const Router = require('Router');

describe('Router', () => {
  it('should convert string to integer', () => {
    assert.deepEqual(
      Router.convertIntParam('2', 'int_key'),
      [2, 'key']
    );
  });
});
