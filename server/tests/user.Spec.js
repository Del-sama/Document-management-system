const chai = require('chai');
const expect = require('chai').expect;

describe('A suite is just a function', () => {
  let a;

  it('and so is a spec', () => {
    a = true;

    expect(a).to.equal(true);
  });
});

