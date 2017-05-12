const config = require('../../../../nightwatch.conf.js');

module.exports = {
  'Search users': function (browser) {
    browser
      .url('http://localhost:5050/app/')
      .waitForElementVisible('body')
      .click('a.login-btn')
      .setValue('input[type=text]', 'kez')
      .setValue('input[type=password]', 'damisi')
      .click('button[type="submit"]')
      .waitForElementVisible('div.center')
      .assert.containsText('div.center', 'Login Successful')
      .pause(2000)
      .assert.urlEquals('http://localhost:5050/app/dashboard')
      .waitForElementVisible('body')
      .assert.elementPresent('input')
      .setValue('input#searchInput', 'delores')
      .click('select[id="database"] option[value="documents"]')
      .click('select[id="database"] option[value="users"]')
      .keys(browser.Keys.RETURN)
      .assert.elementPresent('table#userSearch')
      .waitForElementVisible('table#userSearch')
      .assert.elementPresent('table#userSearch tr:first-of-type>td')
      .assert.containsText('table#userSearch tr:first-of-type>td', 'Delores')
      .end();
    },
    'Search documents': function (browser) {
    browser
      .url('http://localhost:5050/app/')
      .waitForElementVisible('body')
      .click('a.login-btn')
      .setValue('input[type=text]', 'kez')
      .setValue('input[type=password]', 'damisi')
      .click('button[type="submit"]')
      .waitForElementVisible('div.center')
      .assert.containsText('div.center', 'Login Successful')
      .pause(1500)
      .assert.urlEquals('http://localhost:5050/app/dashboard')
      .waitForElementVisible('body')
      .assert.elementPresent('input')
      .setValue('input#searchInput', 'title')
      .click('select[id="database"] option[value="documents"]')
      .keys(browser.Keys.RETURN)
      .assert.elementPresent('table#documentSearch')
      .waitForElementVisible('table#documentSearch')
      .assert.elementPresent('table#documentSearch tr:first-of-type>td')
      .assert.containsText('table#documentSearch tr:first-of-type>td', 'Document')
      .end();
    }
  }