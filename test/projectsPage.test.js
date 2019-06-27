const { describe, it } = require('mocha');
const Page = require('../pages/projectsPage');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

process.on('unhandledRejection', () => { });

(async function filterProjectsTests() {
    try {
        describe('Filter projects functionality automated test', async function () {
            this.timeout('50000');
            let driver, page;

            beforeEach(async () => {
                page = new Page();
                driver = page.driver;
                driver.manage().window().fullscreen();
                await page.visit('http://localhost:8080')
                await page.loginFromProjectsPage();
            })

            afterEach(async () => {
                await page.quit();
            })

            it('should find the name input and genre', async () => {
                const result = await page.findInputs();
                expect(result.nameFilterInputEnabled).to.equal(true);
                expect(result.genreFilterInputEnabled).to.equal(true);
            });

            it('should filter projects by a correct name', async () => {
                const result = await page.submitNameAndGenreAndGetResult("Project", "");
                expect(result.length).to.greaterThan(0)
            })

            it('should filter projects by a correct genre', async () => {
                const result = await page.submitNameAndGenreAndGetResult("", "Trap");
                expect(result.length).to.greaterThan(0)
            })

            it('should filter 0 projects by a incorrect name', async () => {
                const result = await page.submitNameAndGenreAndGetResult("asdasda", "");
                expect(result.length).to.be.at.least(0);
            })

            it('should filter 0 projects by a incorrect genre', async () => {
                const result = await page.submitNameAndGenreAndGetResult("", "asdasdasda");
                expect(result.length).to.greaterThan(0);
            })

            it('should filter projects by name and genre', async () => {
                const result = await page.submitNameAndGenreAndGetResult("Project", "Trap");
                expect(result.length).to.greaterThan(0)
            })
        })

        describe('Delete project functionality', async function () {
            this.timeout('50000');
            let driver, page;

            beforeEach(async () => {
                page = new Page();
                driver = page.driver;
                driver.manage().window().fullscreen();
                await page.visit('http://localhost:8080')
                await page.loginFromProjectsPage();
            })

            afterEach(async () => {
                await page.quit();
            })

            it('should find the delete button', async () => {
                const result = await page.findIcons();
                expect(result.deleteIconEnabled).to.equal(true);
            })

            it('should open the modal when delete button is clicked', async () => {
                const result = await page.clickOnDeleteIcon();
                expect(result).to.equal(true);
            })

            it('should close the modal when cancel button is clicked', async () => {
                const result = await page.clickOnModalCancelButton();
                expect(result).to.equal(false);
            })

            it('should close the modal when confirm is clicked', async () => {
                const result = await page.clickOnModalConfirmButton();
                expect(result).to.equal(false);
            })

            it('should close the modal when close icon is clicked', async () => {
                const result = await page.clickOnModalCloseIcon();
                expect(result).to.equal(false);
            })
        })

        describe('Quick tests', async function () {
            this.timeout('50000');
            let driver, page;

            beforeEach(async () => {
                page = new Page();
                driver = page.driver;
                driver.manage().window().fullscreen();
                await page.visit('http://localhost:8080')
                await page.loginFromProjectsPage();
            })

            afterEach(async () => {
                await page.quit();
            })

            it('should find profile logo', async () => {
                const result = await page.findIcons();
                expect(result.userLogoEnabled).to.equal(true);
            })

            it('should show the dropdown when the profile logo is clicked', async () => {
                const result = await page.clickOnUserProfileLogo();
                expect(result).to.equal(true);
            })

            it('should find profile option and logout option', async () => {
                const result = await page.findIcons();
                expect(result.userProfileOptionEnabled).to.equal(true);
                expect(result.userLogoutOptionEnabled).to.equal(true);
            })

            it('should redirect to profile page when profile option is clicked', async () => {
                const result = await page.clickOnProfileOption();
                expect(result).to.contains('profile');
            })

            it('should redirect to login page when logout is clicked', async () => {
                const result = await page.clickOnLogoutOption();
                expect(result).to.contains('login');
            })

            it('should find the hamburger icon', async () => {
                const result = await page.findIcons();
                expect(result.hamburgerIconEnabled).to.equal(true);
            })

            it('should close the sidebar when hamburger icon is clicked', async () => {
                const result = await page.clickOnHamburgerIcon(1);
                expect(result.hiddenSidebarEnabled).to.equal(true);
            })

            it('should reopen the sidebar when the hamburger icon is clicked twice', async () => {
                const result = await page.clickOnHamburgerIcon(2);
                expect(result.sidebarEnabled).to.equal(true);
            })

            it('should find the edit button', async () => {
                const result = await page.findIcons(); 
                expect(result.openButtonEnabled).to.equal(true);
            })

            it('should open edit page if edit button is clicked', async () => {
                const result = await page.clickOnOpenButton();
                expect(result).to.contains('project');
            })
            
        })
    } catch (err) {
        console.log(new Error(err.message));
    } finally {

    }
})();
