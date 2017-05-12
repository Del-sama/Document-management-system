const config = require('../../../../nightwatch.conf.js');

module.exports = {
  'Edit User Profile': function (browser) {
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
      .pause(1500)
      .assert.urlEquals('http://localhost:5050/app/dashboard')
      .assert.elementPresent('#profile-btn')
      .click('#profile-btn')
      .assert.urlEquals('http://localhost:5050/app/profile')
      .assert.elementPresent('#edit-profile-btn')
      .click('#edit-profile-btn')
      .assert.urlEquals('http://localhost:5050/app/profile/edit')
      .setValue('input#first_name', 'y')

      .click('button.updateUser')
      .end();
  }
};