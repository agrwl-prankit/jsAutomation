class CreateAccountFormElements {

  get firstNameInput() {
    return $("#AccountFrm_firstname");
  }
  get lastNameInput() {
    return $("#AccountFrm_lastname");
  }
  get emailInput() {
    return $("#AccountFrm_email");
  }
  get address1Input() {
    return $("#AccountFrm_address_1");
  }
  get cityInput() {
    return $("#AccountFrm_city");
  }
  get zipInput() {
    return $("#AccountFrm_postcode");
  }
  get loginNameInput() {
    return $("#AccountFrm_loginname");
  }
  get passwordInput() {
    return $("#AccountFrm_password");
  }
  get confirmPasswordInput() {
    return $("#AccountFrm_confirm");
  }
  get stateDropdown() {
    return $("#AccountFrm_zone_id");
  }
  get policyCheckBox() {
    return $("#AccountFrm_agree");
  }

  get continueBtn(){
    return $('button[title="Continue"]');
  }

  async clearForm(){
    await (await this.firstNameInput).clearValue()
    await (await this.lastNameInput).clearValue()
    await (await this.emailInput).clearValue()
    await (await this.address1Input).clearValue()
    await (await this.cityInput).clearValue()
    await (await this.zipInput).clearValue()
    await (await this.loginNameInput).clearValue()
    await (await this.passwordInput).clearValue()
    await (await this.confirmPasswordInput).clearValue()
  }

  async addInput(f_name, l_name, email, address, city, zip, loginName, pasword, c_password){
    await (await this.firstNameInput).setValue(f_name);
    await (await this.lastNameInput).setValue(l_name);
    await (await this.emailInput).setValue(email);
    await (await this.address1Input).setValue(address);
    await (await this.cityInput).setValue(city);
    await (await this.zipInput).setValue(zip);
    await (await this.loginNameInput).setValue(loginName);
    await (await this.passwordInput).setValue(pasword);
    await (await this.confirmPasswordInput).setValue(c_password);
  }

  async addRemainingInput(state){
    await this.stateDropdown.selectByAttribute("value", state);
    await (await this.policyCheckBox).click()
  }

  async clickContinueBtn(){
    const action = (await this.continueBtn)
    await action.waitForClickable();
    await action.click()
  }
}

export default new CreateAccountFormElements();
