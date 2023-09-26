import contactUsPage from '../../pageobjects/contactus/contactUsPage'

describe("", async () => {
  before("open browser", async () => {
    await browser.maximizeWindow();
    await browser.url(
      "http://www.webdriveruniversity.com/Contact-Us/contactus.html"
    );
  });

  it("fill form", async () => {
    // const firstName = await $('input[name="first_name"]');
    // const lastName = await $('input[name="last_name"]');
    // const email = await $('input[name="email"]');
    // const comment = await $('textarea[name="message"]');
    // const submitBtn = await $('input[type="submit"]');

    // await firstName.setValue("Prankit");
    // await lastName.setValue("Agarwal");
    // await email.setValue("prankit@yopmail.com");
    // await comment.setValue("For testing purpose");
    // await submitBtn.click();

    contactUsPage.fillForm('Prankit', 'Agarwal', 'prankit@yopmail.com', 'testing')
  });

  it("verify success message", async () => {
    await expect(browser).toHaveUrlContaining("contact-form-thank-you");
    const successMsg = await $("#contact_reply h1");
    await expect(successMsg).toHaveText("Thank You for your Message!");
  });
});
