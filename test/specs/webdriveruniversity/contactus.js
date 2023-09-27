import contactUsPage from '../../pageobjects/contactus/contactUsPage'

describe("", async () => {
  before("open browser", async () => {
    await browser.maximizeWindow();
    await contactUsPage.open()
    // await browser.url(
    //   "http://www.webdriveruniversity.com/Contact-Us/contactus.html"
    // );
  });

  it("fill form", async () => {
    contactUsPage.fillForm('Prankit', 'Agarwal', 'prankit@yopmail.com', 'testing')
  });

  it("verify success message", async () => {
    await expect(browser).toHaveUrlContaining("contact-form-thank-you");
    const successMsg = await $("#contact_reply h1");
    await expect(successMsg).toHaveText("Thank You for your Message!");
  });
});
