const Page = require('./basePage');

const locator = require('../utils/addProjectLocator');

const projectNameSelectorInputId = locator.projectNameInputSelectorId;
const genreSelectorSelectId = locator.genreSelectSelectorId;
const descriptionSelectorTextareaId = locator.descriptionTextareaSelectorId;
const confirmButtonSelectorClass = locator.confirmButtonSelectorClass;
const requiredProjectNameLabelSelectorId = locator.requiredProjectNameLabelSelectorId;
const requiredGenreLabelSelectorId = locator.requiredGenreLabelSelectorId;
const cancelButtonSelectorClass = locator.cancelButtonSelectorClass;

Page.prototype.findAddProjectInputs = async function () {
    projectNameInput = await this.findById(projectNameSelectorInputId);
    genreSelect = await this.findById(genreSelectorSelectId);
    descriptionTextarea = await this.findById(descriptionSelectorTextareaId);
    confirmButton = await this.findByClass(confirmButtonSelectorClass);
    cancelButton = await this.findByClass(cancelButtonSelectorClass);

    const result = await this.driver.wait(async function () {
        const confirmButtonText = await confirmButton.getText();
        const projectNameInputFlag = await projectNameInput.isEnabled();
        const genreSelectFlag = await genreSelect.isEnabled();
        const descriptionTextareaFlag = await descriptionTextarea.isEnabled();

        return {
            projectNameInputEnabled: projectNameInputFlag,
            genreSelectEnabled: genreSelectFlag,
            descriptionTextareaEnabled: descriptionTextareaFlag,
            confirmButtonText: confirmButtonText
        }
    }, 5000)
    return result;
}

Page.prototype.submitValuesAndGetResult = async function (projectName, genre, description) {
    await this.findAddProjectInputs();
    await this.write(projectNameInput, projectName);
    await this.write(genreSelect, genre);
    await this.write(descriptionTextarea, description);
    await confirmButton.click();
    let resultStat;
    if (genre === "") {
        resultStat = await this.findById(requiredGenreLabelSelectorId)
        return await this.driver.wait(async function () {
            return await resultStat.getText();
        }, 5000)
    } else if (projectName === "") {
        resultStat = await this.findById(requiredProjectNameLabelSelectorId)
        return await this.driver.wait(async function () {
            return await resultStat.getText();
        }, 5000)
    } else {
        await this.driver.get('http://localhost:8080')
        return await this.driver.getCurrentUrl();
    }
}

Page.prototype.loginFromAddProjectPage = async function () {
    emailInput = await this.findById('email');
    passwordInput = await this.findById('password');
    loginButton = await this.findByClass('auth-button');
    await this.write(emailInput, 'admin@splicer.com');
    await this.write(passwordInput, 'adminadmin');
    await loginButton.click();
    await this.driver.get('http://localhost:8080/project')
}

module.exports = Page;