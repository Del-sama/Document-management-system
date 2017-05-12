const config = require('../../../../nightwatch.conf.js');

module.exports = {
  'SignUp Page': function (browser) {
    browser
      .url('http://localhost:5050/app/signup')
      .waitForElementVisible('body')
      .assert.title('Document Management System')
      .setValue('input#userName', 'Delores')
      .setValue('input#firstName', 'Delores')
      .setValue('input#lastName', 'Diei')
      .setValue('input#email', 'deloresdiei@gmail.com')
      .setValue('input#password', '123456')
      .setValue('input#confirmPassword', '123456')
      .click('button[type="submit"]')
      .waitForElementVisible('body')
      .pause(1500)
      .assert.urlEquals('http://localhost:5050/app/signup')
      .waitForElementVisible('body')
      .end();
  }
};