const { describe, it } = require('mocha');
const Page = require('../pages/soundsPage');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

process.on('unhandledRejection', () => { });

(async function soundsPageTests() {
    try {
        describe('Sounds page [Multivariable testing]', async function () {
            this.timeout('50000');
            let driver, page;

            beforeEach(async () => {
                page = new Page();
                driver = page.driver;
                driver.manage().window().fullscreen();
                await page.visit('http://localhost:8080')
                await page.loginFromSoundsPage();
                await driver.get('http://localhost:8080/sounds')
            })

            afterEach(async () => {
                await page.quit();
            })

            it('should find the name and type inputs', async () => {
                const result = await page.findInputsSoundsPage();
                expect(result.nameInputEnabled).to.equal(true);
                expect(result.typeInputEnabled).to.equal(true);
            });

            it('should find no sounds when incorrect type is enetered for a name', async () => {
                const result = await page.sendKeywordsAndGetResultE('bass 1- swag 114bpm.mp3', 'Fx');
                expect(result.length).to.equal(undefined);
            })

            it('should find sounds when correct type is enetered for a name', async () => {
                const result = await page.sendKeywordsAndGetResult('ah - mind 96bpm.mp3', 'Closed Hihat');
                expect(result.length).to.greaterThan(0);
            })

            it('should find no sounds when name and type are incorrect', async () => {
                const result = await page.sendKeywordsAndGetResultE('asda', 'asda');
                expect(result.length).to.equal(undefined);
            })

            it('should find sounds when a correct name is entered for a correct type', async () => {
                const result = await page.sendKeywordsAndGetResult('chord 2 - cruel 67bpm.mp3', 'Fx');
                expect(result.length).to.greaterThan(0);
            })

            it('should find no sounds when an incorrect name is entered for a correct type', async () => {
                const result = await page.sendKeywordsAndGetResultE('asdasda', 'Fx');
                expect(result.length).to.equal(undefined);
            })

            it('should find  sounds when empty name and typs are inserted', async () => {
                const result = await page.sendKeywordsAndGetResult('', '');
                expect(result.length).to.greaterThan(0);
            })


        })
    } catch (err) {
        console.log(new Error(err.message));
    } finally {

    }
})();
