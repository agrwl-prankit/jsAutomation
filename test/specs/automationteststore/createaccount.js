describe("Create Account with all test cases", async () => {
  before("open site", async () => {
    await browser.maximizeWindow();
    await browser.url("https://automationteststore.com/");
  });

  it("hover Home button and click Login", async () => {
    const homeButton = await $("//a[contains(@class,'menu_home')]");
    const accountButton = await $('li[data-id="menu_account"]');
    const loginButton = await $('li[data-id="menu_login"]');
    //await browser.elementHover(homeButton);
    await homeButton.moveTo();
    await homeButton.waitUntil(async function () {
      return await accountButton.isDisplayed();
    });
    //await browser.elementHover(accountButton);
    await accountButton.moveTo();
    await homeButton.waitUntil(async function () {
      return await loginButton.isDisplayed();
    });
    await loginButton.click();
    browser.pause(5000);
  });

  it("check register account is selected and click on Continue", async () => {
    const registerAccountRadioBtn = await $("#accountFrm_accountregister");
    await expect(registerAccountRadioBtn).toBeSelected();
    const continueBtn = await $('button[title="Continue"]');
    await continueBtn.click();
  });

  it("verify if user is on Create Account page", async () => {
    const pageText = await $(".maintext");
    await expect(pageText).toHaveText("CREATE ACCOUNT");
  });

  it("verify if error is displayed with empty mandatory fields", async () => {
    const continueBtn = await $('button[title="Continue"]');
    await continueBtn.click();
    const mainError = await $("//div[contains(@class,'alert-error')]");
    await mainError.waitForDisplayed();

    const firstNameError = await $(
      '//label[text()="First Name:"]/parent::div/span'
    );
    const lastNameError = await $(
      '//label[text()="Last Name:"]/parent::div/span'
    );
    const emailError = await $('//label[text()="E-Mail:"]/parent::div/span');
    const address1Error = await $(
      '//label[text()="Address 1:"]/parent::div/span'
    );
    const cityError = await $('//label[text()="City:"]/parent::div/span');
    const stateError = await $(
      '//label[text()="Region / State:"]/parent::div/span'
    );
    const zipError = await $('//label[text()="ZIP Code:"]/parent::div/span');
    const loginNameError = await $(
      '//label[text()="Login name:"]/parent::div/span'
    );
    const passwordError = await $(
      '//label[text()="Password:"]/parent::div/span'
    );

    await expect(firstNameError).toHaveText(
      "First Name must be between 1 and 32 characters!"
    );
    await expect(lastNameError).toHaveText(
      "Last Name must be between 1 and 32 characters!"
    );
    await expect(emailError).toHaveText(
      "Email Address does not appear to be valid!"
    );
    await expect(address1Error).toHaveText(
      "Address 1 must be between 3 and 128 characters!"
    );
    await expect(cityError).toHaveText(
      "City must be between 3 and 128 characters!"
    );
    await expect(stateError).toHaveText("Please select a region / state!");
    await expect(zipError).toHaveText(
      "Zip/postal code must be between 3 and 10 characters!"
    );
    await expect(loginNameError).toHaveText(
      "Login name must be alphanumeric only and between 5 and 64 characters!"
    );
    await expect(passwordError).toHaveText(
      "Password must be between 4 and 20 characters!"
    );
  });

  it("enter invalid input", async () => {
    const firstNameInput = await $("#AccountFrm_firstname");
    const lastNameInput = await $("#AccountFrm_lastname");
    const emailInput = await $("#AccountFrm_email");
    const address1Input = await $("#AccountFrm_address_1");
    const cityInput = await $("#AccountFrm_city");
    const zipInput = await $("#AccountFrm_postcode");
    const loginNameInput = await $("#AccountFrm_loginname");
    const passwordInput = await $("#AccountFrm_password");

    await firstNameInput.setValue("This is more than 32 characters in input.");
    await lastNameInput.setValue("This is more than 32 characters in input.");
    await emailInput.setValue("Invalid email");
    await address1Input.setValue(
      "Address 1 is more than one hundred twenty eight (128) characters that's why error is stil present on this email input field box.!!"
    );
    await cityInput.setValue("C1");
    await zipInput.setValue("12");
    await loginNameInput.setValue("special @#*^&");
    await passwordInput.setValue("a1b");

    const continueBtn = await $('button[title="Continue"]');
    await continueBtn.click();
  });

  it("verify is error is diplayed for invalid input", async () => {
    const mainError = await $("//div[contains(@class,'alert-error')]");
    await mainError.waitForDisplayed();

    const firstNameError = await $(
      '//label[text()="First Name:"]/parent::div/span'
    );
    const lastNameError = await $(
      '//label[text()="Last Name:"]/parent::div/span'
    );
    const emailError = await $('//label[text()="E-Mail:"]/parent::div/span');
    const address1Error = await $(
      '//label[text()="Address 1:"]/parent::div/span'
    );
    const cityError = await $('//label[text()="City:"]/parent::div/span');
    const stateError = await $(
      '//label[text()="Region / State:"]/parent::div/span'
    );
    const zipError = await $('//label[text()="ZIP Code:"]/parent::div/span');
    const loginNameError = await $(
      '//label[text()="Login name:"]/parent::div/span'
    );
    const passwordError = await $(
      '//label[text()="Password:"]/parent::div/span'
    );
    const confirmPasswordError = await $(
      '//label[text()="Password Confirm:"]/parent::div/span'
    );

    await expect(firstNameError).toHaveText(
      "First Name must be between 1 and 32 characters!"
    );
    await expect(lastNameError).toHaveText(
      "Last Name must be between 1 and 32 characters!"
    );
    await expect(emailError).toHaveText(
      "Email Address does not appear to be valid!"
    );
    await expect(address1Error).toHaveText(
      "Address 1 must be between 3 and 128 characters!"
    );
    await expect(cityError).toHaveText(
      "City must be between 3 and 128 characters!"
    );
    await expect(stateError).toHaveText("Please select a region / state!");
    await expect(zipError).toHaveText(
      "Zip/postal code must be between 3 and 10 characters!"
    );
    await expect(loginNameError).toHaveText(
      "Login name must be alphanumeric only and between 5 and 64 characters!"
    );
    await expect(passwordError).toHaveText(
      "Password must be between 4 and 20 characters!"
    );
    await expect(confirmPasswordError).toHaveText(
      "Password confirmation does not match password!"
    );
  });

  it("remove invalid info and clear the form", async () => {
    const firstNameInput = await $("#AccountFrm_firstname");
    const lastNameInput = await $("#AccountFrm_lastname");
    const emailInput = await $("#AccountFrm_email");
    const address1Input = await $("#AccountFrm_address_1");
    const cityInput = await $("#AccountFrm_city");
    const zipInput = await $("#AccountFrm_postcode");
    const loginNameInput = await $("#AccountFrm_loginname");
    const passwordInput = await $("#AccountFrm_password");

    await firstNameInput.clearValue();
    await lastNameInput.clearValue();
    await emailInput.clearValue();
    await address1Input.clearValue();
    await cityInput.clearValue();
    await zipInput.clearValue();
    await loginNameInput.clearValue();
    await passwordInput.clearValue();
  });

  it("Fill the form with valid input", async () => {
    const firstNameInput = await $("#AccountFrm_firstname");
    const lastNameInput = await $("#AccountFrm_lastname");
    const emailInput = await $("#AccountFrm_email");
    const address1Input = await $("#AccountFrm_address_1");
    const cityInput = await $("#AccountFrm_city");
    const zipInput = await $("#AccountFrm_postcode");
    const loginNameInput = await $("#AccountFrm_loginname");
    const passwordInput = await $("#AccountFrm_password");
    const confirmPasswordInput = await $("#AccountFrm_confirm");
    const stateDropdown = await $("#AccountFrm_zone_id");
    const policyCheckBox = await $("#AccountFrm_agree");

    await firstNameInput.setValue("Prankit");
    await lastNameInput.setValue("Agarwal");
    await emailInput.setValue("prankit@yopmail.com");
    await address1Input.setValue("Sector-30");
    await cityInput.setValue("Gurgaon");
    await stateDropdown.selectByAttribute("value", "3522");
    await zipInput.setValue("122001");
    await passwordInput.setValue("Hrhk@1234");
    await confirmPasswordInput.setValue("Hrhk@1234");
    await policyCheckBox.click();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var hr = today.getHours();
    var min = today.getMinutes();
    await loginNameInput.setValue('day'+dd+mm+hr+min)

    const continueBtn = await $('button[title="Continue"]');
    await continueBtn.click();
  });

  it("Confirmation Success", async () => {
    const validatePage = await $(".maintext");
    await expect(browser).toHaveUrlContaining("success");
    await expect(validatePage).toHaveText("YOUR ACCOUNT HAS BEEN CREATED!");
  });
});
