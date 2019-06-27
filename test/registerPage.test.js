const { describe, it } = require('mocha');
const Page = require('../pages/registerPage');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

process.on('unhandledRejection', () => { });

(async function registerTests() {
    try {
        describe('Register page [Multivariable testing]', async function () {
            this.timeout('50000');
            let driver, page;

            beforeEach(async () => {
                page = new Page();
                driver = page.driver;
                driver.manage().window().fullscreen();
                await page.visit('http://localhost:8080/register')
            })

            afterEach(async () => {
                await page.quit();
            })

            it('should find the register inputs and register button', async () => {
                const result = await page.findInputsRegister();
                expect(result.emailInputEnabled).to.equal(true);
                expect(result.passwordInputEnabled).to.equal(true);
                expect(result.firstNameInputEnabled).to.equal(true);
                expect(result.lastNameInputEnabled).to.equal(true);
                expect(result.usernameInputEnabled).to.equal(true);
                expect(result.registerButtonEnabled).to.equal(true);
            });

            it('should redirect to login when everything is correct', async () => {
                const result = await page.submitKeywordForRegisterSuccess('mark@ronson.com');
                expect(result).to.contain('login');
            })

            it('should show an error if the email already exists', async () => {
                const result = await page.submitKeywordAndGetResultRegister('admin@splicer.com');
                expect(result).to.equal('Email already in use.');
            })

            it('should show an email input error when email is not correct', async () => {
                const result = await page.sumbitWrongEmailForRegister('email');
                expect(result).to.contain('register');
            })

            
        })
    } catch (err) {
        console.log(new Error(err.message));
    } finally {

    }
})();
