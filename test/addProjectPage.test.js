const { describe, it } = require('mocha');
const Page = require('../pages/addProjectPage');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

process.on('unhandledRejection', () => { });

(async function addProjectTests() {
    try{
        describe('Add project functionality', async function() {
            this.timeout('50000');
            let driver, page;

            beforeEach(async () => {
                page = new Page();
                driver = page.driver;
                driver.manage().window().fullscreen();
                await page.visit('http://localhost:8080')
                await page.loginFromAddProjectPage();
            })

            afterEach(async () => {
                await page.quit()
            })

            it('should find the project name input, genre select, description textarea and confirm button', async() => {
                const result = await page.findAddProjectInputs();
                expect(result.projectNameInputEnabled).to.equal(true);
                expect(result.genreSelectEnabled).to.equal(true);
                expect(result.descriptionTextareaEnabled).to.equal(true);
                expect(result.confirmButtonText).to.contain('Confirm');
            })

            it('should add a new project when all the data are entered corectly', async () => {
                const result = await page.submitValuesAndGetResult('test','Jazz','description test');
                expect(result).to.contains('http://localhost:8080');
            })

            it('should show required message when insert project name only', async () => {
                const result = await page.submitValuesAndGetResult('Project 9','','description');
                expect(result).to.contain('Required');
            })

            it('should show required message select genre only', async () => {
                const result = await page.submitValuesAndGetResult('','Jazz','description');
                expect(result).to.contain('Required');
            })
        })
    } catch (err) {
        console.log(new Error(err.message));
    } finally {

    }
})();