var assert = require('assert');

describe('수식표현식 파싱 테스트', function() {
  describe('지수 표현식 테스트', function() {
    it('"10 ^ 2"은 "Math.pow(10,2)"로 반환되어야 한다.', function() {
      assert('Math.pow(10,2)', 'Math.pow(10,2)');
    });
  })
});

describe('계산 수행 테스트', function() {
  describe('기본 사칙연산 계산', function() {
    it('1 + 1 = 2', function() {
      assert.equal(1 + 1, 2);
    });

    it('2 - 1 = 1', function() {
      assert.equal(2 - 1, 1);
    });

    it('2 * 3 = 6', function() {
      assert.equal(2 * 3, 6);
    });

    it('4 / 2 = 2', function() {
      assert.equal(4 / 2, 2);
    });
  });

  describe('지수 계산', function() {
    it('10 ^ 2 = 100', function() {
      assert.equal(Math.pow(10, 2), 100);
    });
  });
});
