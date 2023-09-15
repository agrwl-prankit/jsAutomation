describe("Assignment 1", async () => {
  let price1 = 0;
  let price2 = 0;
  let totalPrice = 0;

  before("open site", async () => {
    await browser.maximizeWindow();
    await browser.url("https://automationteststore.com/");
  });

  it("open skincare", async () => {
    const skinCare = await $('//nav[@class="subnav"]/ul/li[4]');
    await skinCare.click();
    const skincarePageValid = await $('//span[text()="Skincare"]');
    await skincarePageValid.waitForDisplayed();
    expect(skincarePageValid).toHaveText("SKINCARE");
  });

  it("get the list of products", async () => {
    const productListName = await $$(
      "//div[contains(@class, 'col-xs-12') and contains(@class, 'col-sm-6')]/div[1]/div/a"
    );
    console.log("Product List is:");
    for (let ele of productListName) {
      console.log(await ele.getText());
    }
  });

  it("Add Total Moisture Facial Cream in cart", async () => {
    console.log('Adding Total Moisture Facial Cream')
    const addFacialCream = await $('//a[@data-id="66"]');
    await addFacialCream.waitForDisplayed();
    await addFacialCream.scrollIntoView({ inline: "center" });
    await addFacialCream.click();
  });

  it("validate if Total Moisture Facial Cream in cart is added in cart", async () => {
    const addIcon1 = await $('//a[@data-id="66"]/preceding-sibling::div/a');
    await addIcon1.waitUntil(async function () {
      return (await addIcon1.waitForDisplayed()) == true;
    });
    await expect(addIcon1).toBeDisplayed();
  });

  it("get Total Moisture Facial Cream price", async () => {
    const facialCreamPrice = await $(
      '//a[@data-id="66"]/following-sibling::div/div'
    );
    price1 = await facialCreamPrice.getText();
    // remove $ icon and convert to float
    price1 = parseFloat(price1.replace("$", ""));
  });

  it("Add Creme Precieuse Nuit 50ml in cart", async () => {
    console.log('Creme Precieuse Nuit 50ml')
    const addPrecieuseNuit = await $('//a[@data-id="93"]');
    await addPrecieuseNuit.waitForDisplayed();
    await addPrecieuseNuit.scrollIntoView({ inline: "center" });
    await addPrecieuseNuit.click();
  });

  it("validate if Creme Precieuse Nuit is added in the cart", async () => {
    const addIcon2 = await $('//a[@data-id="93"]/preceding-sibling::div/a');
    await addIcon2.waitUntil(async function () {
      return (await addIcon2.waitForDisplayed()) == true;
    });
    await expect(addIcon2).toBeDisplayed();
  });

  it("get Creme Precieuse Nuit price", async () => {
    const precieuseNuitPrice = await $(
      '//a[@data-id="93"]/following-sibling::div/div'
    );
    price2 = await precieuseNuitPrice.getText();
    // remove $ icon and convert to float
    price2 = parseFloat(price2.replace("$", ""));
  });

  it("go to cart", async () => {
    const gotoCart = await $('//div[@class="block_7"]/ul/li/a');
    await gotoCart.click();
    const validatePage = await $(".maintext");
    await expect(validatePage).toHaveText("SHOPPING CART");
  });

  it("Validate price in cart and click checkout", async () => {
    const subTotalPrice = await $(
      '//span[text()="Sub-Total:"]/parent::td/following-sibling::td/span'
    );
    totalPrice = await subTotalPrice.getText();
    totalPrice = parseFloat(totalPrice.replace("$", ""));
    await expect(subTotalPrice).toHaveTextContaining("$"+totalPrice)
    const checkoutBtn = await $("#cart_checkout1");
    await checkoutBtn.click();
  });

  it("guest checkout", async () => {
    const guestCheckoutRadioBtn = await $('input[value="guest"]');
    await guestCheckoutRadioBtn.click();
    const continueBtn = await $('button[title="Continue"]');
    await continueBtn.click();
  });

  it("Fill Guest checkout form", async () => {
    const firstName = await $('input[name="firstname"]');
    await firstName.setValue("Prankit");
    const lastname = await $('input[name="lastname"]');
    await lastname.setValue("Agarwal");
    const email = await $('input[name="email"]');
    await email.setValue("prankit@yopmail.com");
    const address = await $('input[name="address_1"]');
    await address.setValue("Sector 30");
    const city = await $('input[name="city"]');
    await city.setValue("Gurgaon");
    const postcode = await $('input[name="postcode"]');
    await postcode.setValue("122001");
    const countryDropdown = await $('select[name="country_id"]');
    await countryDropdown.selectByAttribute("value", "99");
    await expect(countryDropdown).toHaveValue("99");
    const stateDropdown = await $("#guestFrm_zone_id");
    await browser.pause(2000);
    await stateDropdown.selectByVisibleText("Haryana");
    await expect(stateDropdown).toHaveValue("1486");

    const continueBtn = await $('button[title="Continue"]');
    await continueBtn.click();
  });

  it("checkout confirmation", async () => {
    const validatePage = await $(".maintext");
    await expect(validatePage).toHaveText("CHECKOUT CONFIRMATION");

    const subTotalPrice = await $(
      '//span[text()="Sub-Total:"]/parent::td/following-sibling::td/span'
    );
    totalPrice = await subTotalPrice.getText();
    totalPrice = parseFloat(totalPrice.replace("$", ""));
    await expect(subTotalPrice).toHaveTextContaining("$"+totalPrice)

    const confirmOrderBtn = await $("#checkout_btn");
    await confirmOrderBtn.click();
  });

  it("Confirmation Success", async () => {
    const validatePage = await $(".maintext");
    await expect(browser).toHaveUrlContaining("success");
    await expect(validatePage).toHaveText("YOUR ORDER HAS BEEN PROCESSED!");
  });
});
