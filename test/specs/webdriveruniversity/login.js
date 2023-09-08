describe("Login test cases on web driver university", () => {
  it("with valid info", async () => {
    await browser.url(
      "http://www.webdriveruniversity.com/Contact-Us/contactus.html"
    );
    await browser.maximizeWindow();
    const firstName = await $("input[placeholder='First Name']");
    const lastName = await $('input[placeholder="Last Name"]');
    const email = await $("input[placeholder='Email Address']");
    const comment = await $("textarea[name='message']");
    const submitButton = await $("input[value='SUBMIT']");

    await firstName.setValue("Prankit");
    await lastName.setValue("Agarwal");
    await email.setValue("abc@yopmail.com");
    await comment.setValue("learning");

    submitButton.click();
    await browser.pause(1000);
    const successMsg = await $('//div[@id="contact_reply"]');
    console.log("Log of with valid info: " + (await successMsg.getText()));
  });

  it("without email address info", async () => {
    await browser.url(
      "http://www.webdriveruniversity.com/Contact-Us/contactus.html"
    );
    await browser.maximizeWindow();
    const firstName = await $("input[placeholder='First Name']");
    const lastName = await $('input[placeholder="Last Name"]');
    const comment = await $("textarea[name='message']");
    const submitButton = await $("input[value='SUBMIT']");

    await firstName.setValue("Prankit");
    await lastName.setValue("Agarwal");
    await comment.setValue("learning");

    submitButton.click();
    await browser.pause(1000);
    const invalidText = await $("//body");
    console.log(
      "Log of without email address info: " + (await invalidText.getText())
    );
    //await browser.pause(10000)
  });

  it("Invalid email address", async () => {
    await browser.url(
      "http://www.webdriveruniversity.com/Contact-Us/contactus.html"
    );
    const firstName = await $("input[placeholder='First Name']");
    const lastName = await $('input[placeholder="Last Name"]');
    const comment = await $("textarea[name='message']");
    const email = await $("input[placeholder='Email Address']");
    const submitButton = await $("input[value='SUBMIT']");

    await firstName.setValue("Prankit");
    await lastName.setValue("Agarwal");
    await email.setValue("abc");
    await comment.setValue("learning");

    submitButton.click();
    await browser.pause(1000);
    const invalidEmail = await $("//body");
    console.log(await invalidEmail.getText());
  });
});
