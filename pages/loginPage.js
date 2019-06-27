const Page = require('./basePage');
const locator = require('../utils/loginLocator');

const emailSelectorInputId = locator.emailInputSelectorId;
const passwordSelectorInputId = locator.passwordInputSelectorId;
const loginButtonSelectorClassName = locator.loginButtonSelectorClass;
const errorMessageSelectorClassName = locator.errorMessageSelectorClass;

let emailInput, passwordInput, loginButton;

Page.prototype.findInputAndButton = async function () {
    emailInput = await this.findById(emailSelectorInputId);
    passwordInput = await this.findById(passwordSelectorInputId);
    loginButton = await this.findByClass(loginButtonSelectorClassName);

    const result = await this.driver.wait(async function () {
        const loginButtonText = await loginButton.getText();
        const emailInputEnableFlag = await emailInput.isEnabled();
        const passwordInputEnableFlag = await passwordInput.isEnabled();

        return {
            emailInputEnabled: emailInputEnableFlag,
            passwordInputEnabled: passwordInputEnableFlag,
            loginButtonText: loginButtonText
        }
    }, 5000);
    return result;

}

Page.prototype.submitKeywordForLoginSuccess = async function (){
    await this.findInputAndButton();
    await this.write(emailInput, 'admin@splicer.com');
    await this.write(passwordInput, 'adminadmin');
    await loginButton.click();
    await this.driver.get('http://localhost:8080/projects')
    return await this.driver.wait(async () => {
        return await this.driver.getCurrentUrl();
    }, 5000)
}

Page.prototype.submitKeywordAndGetResult = async function(email, password){
    await this.findInputAndButton();
    await this.write(emailInput, email);
    await this.write(passwordInput, password);
    await loginButton.click();
    resultStat = await this.findByClass(errorMessageSelectorClassName);
    return await this.driver.wait(async function(){
        return await resultStat.getText();
    }, 5000)

}


module.exports = Page;