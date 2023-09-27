import { default as BasePage } from "./BasePage";

class CreateAccountPage extends BasePage {
  open() {
    return super.open("https://automationteststore.com/");
  }

  async maximizeWindow() {
    await browser.maximizeWindow();
  }

  get accountTabOnHomePage() {
    return $('//span[text()="Account"]');
  }

  get loginInAccount() {
    return $(
      '//span[text()="Account"]/parent::a/following-sibling::ul/li[1]/a'
    );
  }

  get continueBtnOnRegisterLogin(){
    return $('button[title="Continue"]')
  }

  async goToLoginPageFromHomePage() {
    await (await this.accountTabOnHomePage).moveTo();
    await (await this.loginInAccount).click();
  }

  async goToRegisterAccountPage(){
    await (await this.continueBtnOnRegisterLogin).click()
  }
}

export default new CreateAccountPage();
