const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

let options = new firefox.Options();
options.addArguments('start-fullscreen');
options.addArguments('disable-infobars');

var Page = function () {
    this.driver = new Builder()
        .setFirefoxOptions(options)
        .forBrowser('firefox')
        .build();

    this.visit = async function (url) {
        return await this.driver.get(url)
    }

    this.quit = async function () {
        return await this.driver.quit()
    }

    this.findById = async function (id) {
        await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
        return await this.driver.findElement(By.id(id));
    }

    this.findByClass = async function (className) {
        await this.driver.wait(until.elementLocated(By.className(className)), 15000, 'Looking for element');
        return await this.driver.findElement(By.className(className));
    }

    this.findIfExistsByClass = async function (className) {
        let modalIsStillThere;
        try {
            modalIsStillThere = await this.driver.findElement(By.className(className)).isDisplayed();
        } catch (e) {
            modalIsStillThere = false;
        }
        return await modalIsStillThere;
    }

    this.findByName = async function (name) {
        await this.driver.wait(until.findElement(By.name(name)), 15000, 'Looking for element');
        return await this.driver.findElement(By.name(name));
    }

    this.findIfDivHasSpecifiedStyle = async function (className, style){
        result = await this.driver.findElement(By.className(className)).getCssValue(style) === 'visible';
    }

    this.write = async function (el, txt) {
        return await el.sendKeys(txt);
    }

}

module.exports = Page;

