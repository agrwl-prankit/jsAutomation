module.exports = {
  clickSubmitButton: async function (element) {
    await element.waitForExist();
    await element.waitForDisplayed();
    await element.click();
  },
};
