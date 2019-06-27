const { describe, it } = require('mocha');
const Page = require('../pages/loginPage');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

process.on('unhandledRejection', () => { });

(async function loginTests() {
    try {
        describe('Login functionality test', async function () {
            this.timeout('50000');
            let driver, page;

            beforeEach(async () => {
                page = new Page();
                driver = page.driver;
                driver.manage().window().fullscreen();
                await page.visit('http://localhost:8080/login')
            })

            afterEach(async () => {
                await page.quit();
            })

            it('should find the email input, password input and login button', async () => {
                const result = await page.findInputAndButton();
                expect(result.emailInputEnabled).to.equal(true);
                expect(result.passwordInputEnabled).to.equal(true)
                expect(result.loginButtonText).to.include('Login')
            });

            it('should show an error when insert wrong email and click login button', async () => {
                const result = await page.submitKeywordAndGetResult("wrongEmail@asdasd.com", "parola");
                expect(result).to.equal('There is no account with that email address.');
            });

            it('should show an error when insert wrong password and click login button', async () => {
                const result = await page.submitKeywordAndGetResult("admin@splicer.com", "parola");
                expect(result).to.equal('Password does not match.');
                
            });

            it('should show an error when insert nothing and click login button', async () => {
                const result = await page.submitKeywordAndGetResult("", "");
                expect(result).to.equal('Please fill out the required fields.');
            });

            it('should redirect to projects page when insert correct data and click login button', async () => {
                const result = await page.submitKeywordForLoginSuccess();
                expect(result).to.contains('projects')
            });
        })
    } catch (err) {
        console.log(new Error(err.message));
    } finally {

    }
})();
