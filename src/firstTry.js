var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

async function loginTest() {
    try{
        var driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();

        //load my personal url
        await driver.get('http://localhost:8080');

        await driver.takeScreenshot();

        await driver.findElement(By.id('email')).sendKeys('admin@splice.com');
        await driver.findElement(By.id('password')).sendKeys('adminadmin');

        await driver.takeScreenshot();

        await driver.findElement(By.css("button[type=submit]")).click();
        let string;

        await driver.findElement(By.className('error')).getText().then((value) => {
            string = value;
        });
        
        if(string === "There is no account with that email address."){
            console.log('Email is not good!');
            driver.quit();
        } else{
            console.log('We did it!');
            driver.quit();
        }
    }
    catch(e){
        handleFailure(e, driver)
    }
}

loginTest();

function handleFailure(err, driver) {
    console.error('Something went wrong!\n', err.stack, '\n');
    driver.quit();
} 