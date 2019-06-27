const Page = require('./basePage');
const { By } = require('selenium-webdriver');
const locator = require('../utils/soundsPageLocator.js');

const nameInputSelectorClass = locator.nameInputSelectorClass;
const typeInputSelectorClass = locator.typeInputSelectorClass;
const rowDivSelectorClass = locator.rowDivSelectorClass;
const gridDivSelectorId = locator.gridDivSelectorId;
let nameInput, typeInput, grid;

Page.prototype.findInputsSoundsPage = async function () {
    nameInput = await this.findByClass(nameInputSelectorClass);
    typeInput = await this.findByClass(typeInputSelectorClass);
    const result = await this.driver.wait(async () => {
        const nameInputFlag = await nameInput.isEnabled();
        const typeInputFlag = await typeInput.isEnabled();

        return {
            nameInputEnabled: nameInputFlag,
            typeInputEnabled: typeInputFlag
        }
    }, 5000);

    return result;
}

Page.prototype.loginFromSoundsPage = async function () {
    emailInput = await this.findById('email');
    passwordInput = await this.findById('password');
    loginButton = await this.findByClass('auth-button');
    await this.write(emailInput, 'admin@splicer.com');
    await this.write(passwordInput, 'adminadmin');
    await loginButton.click();
    await this.driver.get('http://localhost:8080/sounds')
}

Page.prototype.sendKeywordsAndGetResult = async function (name, type) {
    await this.findInputsSoundsPage();
    await this.write(nameInput, name)
    await this.write(typeInput, type)
    let resultStat = await this.findById(gridDivSelectorId);
    return await this.driver.wait(async function () {
        return await resultStat.findElements(By.className(rowDivSelectorClass));
    }, 5000)
}

Page.prototype.sendKeywordsAndGetResultE = async function (name, type) {
    await this.findInputsSoundsPage();
    await this.write(nameInput, name)
    await this.write(typeInput, type)
    let resultStat = await this.findById(gridDivSelectorId);
    return await this.driver.wait(async function () {
        return await resultStat.findElement(By.className(rowDivSelectorClass));
    }, 5000)
}


module.exports = Page;