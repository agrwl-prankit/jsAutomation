describe("adding test cases on test link", async () => {
  before("", async () => {
    await browser.url("https://testlink.live.cloudzmall.com/");
    await browser.maximizeWindow();
  });

  it("login", async () => {
    // login
    const loginName = await $('input[name="tl_login"]');
    const loginPass = await $("#tl_password");
    const loginButton = await $("#tl_login_button");
    await loginName.setValue("nishchey.bhutani");
    await loginPass.setValue("Hrhk@2023!");
    await loginButton.click();
  });

  it("click on Test Specification and navigate to testSuite/test case page", async () => {
    const mainFrame = await $(".siteContent");
    await browser.switchToFrame(mainFrame);
    const testSpecification = await $(
      '//div[@class="vertical_menu"][2]/div[3]/a'
    );
    await testSpecification.click();
  });

  it("expand testsuite", async () => {
    // go to test suite, mainFrame => treeFrame
    const treeFrame = await $(".treeframe");
    await browser.switchToFrame(treeFrame);
    // click on expand icon
    const testSuite = await $(
      '//span[text()="ADMIN - VIEW USER DETAILS (108)"]/parent::span/parent::a/parent::div/img[1]'
    );
    await testSuite.click();
    await browser.pause(1000);
  });

  it("click on test case and start writing basic info", async () => {
    // get the list of testCases
    const testCases = await $$(
      '//div[@id="extdd-184"]/parent::li/parent::ul/li'
    );

    for (let ele of testCases) {
      await ele.click();
      // main frame
      await browser.switchToParentFrame();
      // mainFrame => workframe
      const workFrame = await $(".workframe");
      await browser.switchToFrame(workFrame);

      const summary = await $("//table[@class='simple'][1]/tbody/tr[1]/th");
      const sumaryText = await summary.getText();
      const summaryText2 = sumaryText.split("heck if");
      const expectedResult1 = summaryText2[summaryText2.length - 1];
      const expectedResultValue = expectedResult1.split(" - Version 1");

      const actionBtn = await $('//div[@class="workBack"]/img[2]');
      await actionBtn.click();
      await browser.pause(1000);
      const editBtn = await $('//input[@value="Edit"]');
      await editBtn.click();

      // mainFrame => workframe => pre-condition frame
      const preConditionFrame = await $('//div[@id="cke_2_contents"]/iframe');
      await browser.switchToFrame(preConditionFrame);
      await browser.pause(1000);
      const preConditionInput = await $(
        "//title[@data-cke-title='Rich Text Editor, preconditions']/parent::head/parent::html/body/p"
      );
      // Enter value in pre-condition
      await preConditionInput.setValue("User is able to login");
      await browser.pause(1000);

      // mainFrame => workframe
      await browser.switchToParentFrame();
      // Enter story url
      const userStoryUrl = await $(
        '//td[@id="label_custom_field_0_2"]/parent::tr/td[2]/input'
      );
      await userStoryUrl.setValue(
        "https://daffodilit.atlassian.net/browse/DEA-45"
      );
      // double click Functional
      const functionalBtn = await $(
        '//*[text()="Available Keywords"]/parent::td/select/option[2]'
      );
      await functionalBtn.doubleClick();
      // click save buttn
      const clickBasicInfoBtn = await $('input[name="do_update"]');
      await clickBasicInfoBtn.click();
      await browser.pause(1000);

      // click on create step button
      const createStepBtn = await $("input[name='create_step']");
      await createStepBtn.click();
      await browser.pause(1000);

      // mainFrame => workframe => step frame
      const stepFrame = await $("//iframe[@title='Rich Text Editor, steps']");
      await browser.switchToFrame(stepFrame);
      const stepInput = await $(
        "//title[@data-cke-title='Rich Text Editor, steps']/parent::head/parent::html/body/p"
      );
      await stepInput.setValue("Login with creds");
      // mainFrame => workframe
      await browser.switchToParentFrame();
      const saveStepBtn = await $("#do_update_step");
      await saveStepBtn.click();
      await browser.pause(1000);
      // mainFrame => workframe => step frame
      const step2Frame = await $("//iframe[@title='Rich Text Editor, steps']");
      await browser.switchToFrame(step2Frame);
      const step2Input = await $(
        "//title[@data-cke-title='Rich Text Editor, steps']/parent::head/parent::html/body/p"
      );
      await step2Input.setValue("Navigate to listing, Click on view details");
      // mainFrame => workframe
      await browser.switchToParentFrame();
      // mainFrame => workframe => expected result frame
      const expctedRsltFrame = await $(
        "//iframe[@title='Rich Text Editor, expected_results']"
      );
      await browser.switchToFrame(expctedRsltFrame);
      const expectedResultInput = await $(
        "//title[@data-cke-title='Rich Text Editor, expected_results']/parent::head/parent::html/body/p"
      );
      await expectedResultInput.setValue(expectedResultValue[0]);
      // mainFrame => workframe
      await browser.switchToParentFrame();
      const saveAndExitBtn = await $('input[value="Save & exit"]');
      await saveAndExitBtn.click();

      // main frame
      await browser.switchToParentFrame();
      // mainFrame => tree frame
      const treeFrame = await $(".treeframe");
      await browser.switchToFrame(treeFrame);
    }
  });
});
