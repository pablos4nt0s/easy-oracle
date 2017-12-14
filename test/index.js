import { assert } from 'chai';
import easyoracle from '../src/easy-oracle';

describe('oracledb load test.', () => {
  it('should test oracledb loading', () => {
    assert(easyoracle.oracledb.maxRows === 0, 'Not awesome :(');
  });
});
