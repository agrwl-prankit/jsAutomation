import { default as createAccountFormElement } from "../../pageobjects/automationstore/createAccountFormElement";
import { default as createaccountPage } from "../../pageobjects/automationstore/createaccountPage";
import { default as formErrorElements } from "../../pageobjects/automationstore/formErrorElements";

describe("create account test cases using POM", async () => {
  before("maximize window and open url", async () => {
    await createaccountPage.maximizeWindow();
    await createaccountPage.open();
  });

  beforeEach('', async()=>{
    await browser.pause(2000)
  })

  it("go to login page", async () => {
    await createaccountPage.goToLoginPageFromHomePage();
    await expect(browser).toHaveUrlContaining("account/login");
  });

  it("go to register account page", async () => {
    await createaccountPage.goToRegisterAccountPage();
    await expect(browser).toHaveUrlContaining("account/create");
  });

  it("verify if error is displayed with empty mandatory fields", async () => {
    await createAccountFormElement.clickContinueBtn();
    await formErrorElements.verifyFormError();
  });

  it("enter invalid input", async () => {
    await createAccountFormElement.addInput(
      "This is more than 32 characters in input.",
      "This is more than 32 characters in input.",
      "Invalid email",
      "Address 1 is more than one hundred twenty eight (128) characters that's why error is stil present on this email input field box.!!",
      "C1",
      "12",
      "special @#*^&",
      "a1b",
      ""
    );
    await createAccountFormElement.clickContinueBtn();
  });

  it("verify is error is diplayed for invalid input", async () => {
    await formErrorElements.verifyFormError();
  });

  it("remove invalid info and clear the form", async () => {
    await createAccountFormElement.clearForm();
  });

  it("Fill the form with valid input", async () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var hr = today.getHours();
    var min = today.getMinutes();
    const l_name = "day" + dd + mm + hr + min;
    const email = "email" + dd + mm + hr + min + "@yopmail.com";

    await createAccountFormElement.addInput(
      "Prankit",
      "Agarwal",
      email,
      "Sector-30",
      "Gurgaon",
      "122001",
      l_name,
      "Hrhk@1234",
      "Hrhk@1234"
    );
    await createAccountFormElement.addRemainingInput("3522");

    await createAccountFormElement.clickContinueBtn();
  });

  it("Confirmation Success", async () => {
    const validatePage = await $(".maintext");
    await expect(browser).toHaveUrlContaining("success");
    await expect(validatePage).toHaveText("YOUR ACCOUNT HAS BEEN CREATED!");
  });
});
