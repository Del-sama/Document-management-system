const config = require('../../../../nightwatch.conf.js');

module.exports = {
  'Login Page': function (browser) {
    browser
      .url('http://localhost:5050/app/')
      .waitForElementVisible('body')
      .assert.title('Document Management System')
      .click('a.login-btn')
      .setValue('input[type=text]', 'kez')
      .setValue('input[type=password]', 'damisi')
      .click('button[type="submit"]')
      .waitForElementVisible('div.center')
      .assert.containsText('div.center', 'Login Successful')
      .saveScreenshot('screenshots/loginPage.png')
      .pause(1500)
      .assert.urlEquals('http://localhost:5050/app/dashboard')
      .click('a.signout-btn')
      .assert.urlEquals('http://localhost:5050/app/')
      .end();
  }
};