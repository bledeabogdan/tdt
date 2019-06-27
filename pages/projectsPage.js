const Page = require('./basePage');
const { By } = require('selenium-webdriver');
const locator = require('../utils/projectsLocator.js');

const nameFilterSelectorInputName = locator.nameFilterInputName;
const genreFilterSelectorInputName = locator.genreFilterInputName;
const cardsContainerSelectorDivClass = locator.cardsContainerDivClass;
const deleteSelectorIconClass = locator.deleteIconSelectorClass;
const confirmButtonSelectorClass = locator.confirmButtonSelectorClass;
const cancelButtonSelectorClass = locator.cancelButtonSelectorClass;
const modalDivSelectorClass = locator.modalDivSelectorClass;
const cardDivSelectorClass = locator.cardDivSelectorClass;
const closeIconSelectorClass = locator.closeIconSelectorClass;
const userLogoSelectorClass = locator.userLogoSelectorClass;
const userMenuDropdownSelectorClass = locator.userMenuDropdownSelectorClass;
const userProfileSelectorDivClass = locator.userProfileSelectorDivClass;
const userLogoutSelectorDivClass = locator.userLogoutSelectorDivClass;
const hamburgerIconSelectorClass = locator.hamburgerIconSelectorClass;
const sidebarSelectorClass = locator.sidebarSelectorClass;
const hiddenSidebarSelectorClass = locator.hiddenSidebarSelectorClass;
const openButtonSelectorClass = locator.openButtonSelectorClass;

let nameFilterInput, genreFilterInput, profileOption, logoutOption, profileLogo, hamburgerIcon, sidebar, hiddenSidebar,
openButton;

Page.prototype.findInputs = async function () {
    nameFilterInput = await this.findById(nameFilterSelectorInputName);
    genreFilterInput = await this.findById(genreFilterSelectorInputName);
    const result = await this.driver.wait(async function () {
        const nameFilterInputEnableFlag = await nameFilterInput.isEnabled();
        const genreFilterInputEnableFlag = await genreFilterInput.isEnabled();

        return {
            nameFilterInputEnabled: nameFilterInputEnableFlag,
            genreFilterInputEnabled: genreFilterInputEnableFlag
        }
    }, 5000)

    return result;
}

Page.prototype.loginFromProjectsPage = async function () {
    emailInput = await this.findById('email');
    passwordInput = await this.findById('password');
    loginButton = await this.findByClass('auth-button');
    await this.write(emailInput, 'admin@splicer.com');
    await this.write(passwordInput, 'adminadmin');
    await loginButton.click();
    await this.driver.get('http://localhost:8080/projects')
}

Page.prototype.findIcons = async function () {
    deleteIcon = await this.findByClass(deleteSelectorIconClass);
    profileLogo = await this.findByClass(userLogoSelectorClass);
    profileOption = await this.findByClass(userProfileSelectorDivClass);
    logoutOption = await this.findByClass(userLogoutSelectorDivClass);
    hamburgerIcon = await this.findByClass(hamburgerIconSelectorClass);
    openButton = await this.findByClass(openButtonSelectorClass);
    const result = await this.driver.wait(async function () {
        const delteIconEnableFlag = await deleteIcon.isEnabled();
        const userLogoEnableFlag = await profileLogo.isEnabled();
        const userProfileOptionFlag = await profileOption.isEnabled();
        const userLogoutOptionFlag = await logoutOption.isEnabled();
        const hamburgerIconFlag = await hamburgerIcon.isEnabled();
        const openButtonFlag = await openButton.isEnabled();

        return {
            deleteIconEnabled: delteIconEnableFlag,
            userLogoEnabled: userLogoEnableFlag,
            userProfileOptionEnabled: userProfileOptionFlag,
            userLogoutOptionEnabled: userLogoutOptionFlag,
            hamburgerIconEnabled: hamburgerIconFlag,
            openButtonEnabled: openButtonFlag
        }
    }, 5000)

    return result;
}

Page.prototype.findSidebar = async function (what) {
    let result;
    if (what === 'sidebar') {
        sidebar = await this.findByClass(sidebarSelectorClass);
        result = await this.driver.wait(async function () {
            const sidebarEnableFlag = await sidebar.isEnabled();
            return {
                sidebarEnabled: sidebarEnableFlag
            }
        }, 5000)
    }
    if (what === 'hide'){
        hiddenSidebar = await this.findByClass(hiddenSidebarSelectorClass);
        result = await this.driver.wait(async function () {
            const hiddenSidebarEnableFlag = await hiddenSidebar.isEnabled();
            return {
                hiddenSidebarEnabled: hiddenSidebarEnableFlag
            }
        }, 5000)
    }

    return result;
}

Page.prototype.submitNameAndGenreAndGetResult = async function (name, genre) {
    await this.findInputs();
    await this.write(nameFilterInput, name);
    await this.write(genreFilterInput, genre);

    resultStat = await this.findByClass(cardsContainerSelectorDivClass);
    return await this.driver.wait(async function () {
        return await resultStat.findElements(By.className(cardDivSelectorClass));
    }, 5000)
}

Page.prototype.clickOnDeleteIcon = async function () {
    deleteIcon = await this.findByClass(deleteSelectorIconClass);
    await deleteIcon.click();
    resultStat = await this.findByClass(modalDivSelectorClass);
    return await this.driver.wait(async function () {
        return await resultStat.isEnabled();
    }, 5000)
}

Page.prototype.clickOnModalCancelButton = async function () {
    deleteIcon = await this.findByClass(deleteSelectorIconClass);
    await deleteIcon.click();
    cancelButton = await this.findByClass(cancelButtonSelectorClass)
    await cancelButton.click();
    result = await this.findIfExistsByClass(modalDivSelectorClass)
    return await result;
}

Page.prototype.clickOnModalConfirmButton = async function () {
    deleteIcon = await this.findByClass(deleteSelectorIconClass);
    await deleteIcon.click();
    confirmButton = await this.findByClass(confirmButtonSelectorClass)
    await confirmButton.click();
    result = await this.findIfExistsByClass(modalDivSelectorClass)
    return await result;
}

Page.prototype.clickOnModalCloseIcon = async function () {
    deleteIcon = await this.findByClass(deleteSelectorIconClass);
    await deleteIcon.click();
    closeIcon = await this.findByClass(closeIconSelectorClass)
    await closeIcon.click();
    result = await this.findIfExistsByClass(modalDivSelectorClass)
    return await result;
}

Page.prototype.clickOnUserProfileLogo = async function () {
    userLogo = await this.findByClass(userLogoSelectorClass);
    await userLogo.click();
    result = await this.findByClass(userMenuDropdownSelectorClass);
    resultStat = await result.getCssValue('visibility');
    return await resultStat === 'visible';
}

Page.prototype.clickOnProfileOption = async function () {
    await this.findIcons();
    await profileLogo.click();
    await profileOption.click();
    return await this.driver.getCurrentUrl();
}

Page.prototype.clickOnLogoutOption = async function () {
    await this.findIcons();
    await profileLogo.click();
    await logoutOption.click();
    return await this.driver.getCurrentUrl();
}

Page.prototype.clickOnHamburgerIcon = async function (times) {
    await this.findIcons();
    if(times === 1){
        await hamburgerIcon.click();
        return await this.findSidebar('hide');
    }else{
        await hamburgerIcon.click();
        await hamburgerIcon.click();
        return await this.findSidebar('sidebar');
    }
    
}

Page.prototype.clickOnOpenButton = async function (){
    await this.findIcons();
    await openButton.click();
    return await this.driver.getCurrentUrl();
}

module.exports = Page;