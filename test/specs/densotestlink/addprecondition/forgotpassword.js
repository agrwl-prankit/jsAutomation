describe("adding test cases on test link", async () => {

    const preCondition = 'User must have access of login url'

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
        '//span[text()="Forgot Password (67)"]/parent::span/parent::a/parent::div/img[1]'
      );
      await testSuite.click();
      await browser.pause(1000);
    });
  
    it("click on test case and start writing basic info", async () => {
      // get the list of testCases
      const testCases = await $$(
        '//div[@id="extdd-187"]/parent::li/parent::ul/li'
      );
  
      for (let ele of testCases) {
        await ele.scrollIntoView({inline: 'center'})
        await ele.click();
        // main frame
        await browser.switchToParentFrame();
        // mainFrame => workframe
        const workFrame = await $(".workframe");
        await browser.switchToFrame(workFrame);
  
        const actionBtn = await $('//div[@class="workBack"]/img[2]');
        await actionBtn.click();
        const editBtn = await $('//input[@value="Edit"]');
        await editBtn.waitForDisplayed()
        await editBtn.click();
        await browser.pause(2000)
  
        // mainFrame => workframe => pre-condition frame
        const preConditionFrame = await $('//div[@id="cke_2_contents"]/iframe');
        await preConditionFrame.waitForDisplayed({timeout: 20000}, {intervale: 2000})
        await browser.switchToFrame(preConditionFrame);
        const preConditionInput = await $(
          "//title[@data-cke-title='Rich Text Editor, preconditions']/parent::head/parent::html/body/p"
        );
        // Enter value in pre-condition
        await preConditionInput.clearValue()
        await preConditionInput.addValue(preCondition);
  
        // mainFrame => workframe
        await browser.switchToParentFrame();

        // click Save button
        const saveBtn = await $('input[name="do_update"]')
        await saveBtn.click()
        
  
        // main frame
        await browser.switchToParentFrame();
        // mainFrame => tree frame
        const treeFrame = await $(".treeframe");
        await browser.switchToFrame(treeFrame);
      }
    });
  });
  