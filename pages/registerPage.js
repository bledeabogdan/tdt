const Page = require('./basePage');
const locator = require('../utils/registerPageLocator.js');

const firstNameInputSelectorId = locator.firstNameInputSelectorId;
const lastNameInputSelectorId = locator.lastNameInputSelectorId;
const usernameInputSelectorId = locator.userNameInputSelectorId;
const emailInputSelectorId = locator.emailInputSelectorId;
const passwordInputSelectorId = locator.passwordInputSelectorId;
const registerButtonSelectorClass = locator.registerButtonSelectorClass;
const errorSpanSelectorClass = locator.errorSpanSelectorClass;

let firstNameInput, lastNameInput, usernameInput, emailInput, passwordInput, registerButton;

Page.prototype.findInputsRegister = async function () {
    firstNameInput = await this.findById(firstNameInputSelectorId);
    lastNameInput = await this.findById(lastNameInputSelectorId);
    usernameInput = await this.findById(usernameInputSelectorId);
    emailInput = await this.findById(emailInputSelectorId);
    passwordInput = await this.findById(passwordInputSelectorId);
    registerButton = await this.findByClass(registerButtonSelectorClass);

    const result = await this.driver.wait(async function () {
        const firstNameInputFlag = await firstNameInput.isEnabled();
        const lastNameInputFlag = await lastNameInput.isEnabled();
        const usernameInputFlag = await usernameInput.isEnabled();
        const emailInputFlag = await emailInput.isEnabled();
        const passwordInputFlag = await passwordInput.isEnabled();
        const registerButtonFlag = await registerButton.isEnabled();

        return {
            firstNameInputEnabled: firstNameInputFlag,
            lastNameInputEnabled: lastNameInputFlag,
            usernameInputEnabled: usernameInputFlag,
            emailInputEnabled: emailInputFlag,
            passwordInputEnabled: passwordInputFlag,
            registerButtonEnabled: registerButtonFlag
        }
    }, 5000)

    return result;
}
Page.prototype.submitKeywordForRegisterSuccess = async function (email) {
    await this.findInputsRegister();
    await this.write(firstNameInput, 'Jessie J')
    await this.write(lastNameInput, 'J'),
    await this.write(usernameInput, 'jessiej'),
    await this.write(emailInput, email);
    await this.write(passwordInput, 'parola1.');
    await registerButton.click();
    await this.driver.get("http://localhost:8080/projects")
    return await this.driver.wait(async () => {
        return await this.driver.getCurrentUrl();
    }, 5000)
}

Page.prototype.submitKeywordAndGetResultRegister = async function (email) {
    await this.findInputsRegister();
    await this.write(firstNameInput, 'Jessie J')
    await this.write(lastNameInput, 'J'),
    await this.write(usernameInput, 'jessiej'),
    await this.write(emailInput, email);
    await this.write(passwordInput, 'parola1.');
    await registerButton.click();
    resultStat = await this.findByClass(errorSpanSelectorClass);
    return await this.driver.wait(async function () {
        return await resultStat.getText();
    }, 5000)
}

Page.prototype.sumbitWrongEmailForRegister = async function (email) {
    await this.findInputsRegister();
    await this.write(firstNameInput, 'Jessie J')
    await this.write(lastNameInput, 'J'),
    await this.write(usernameInput, 'jessiej'),
    await this.write(emailInput, email);
    await this.write(passwordInput, 'parola1.');
    await registerButton.click();
    await this.driver.get('http://localhost:8080/register')
    result = await this.driver.getCurrentUrl();
    return await this.driver.wait(async function () {
        return await result;
    }, 5000)
}



module.exports = Page;