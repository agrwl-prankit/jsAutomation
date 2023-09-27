class FormErrorElements {
  get firstNameError() {
    return $('//label[text()="First Name:"]/parent::div/span');
  }

  get lastNameError() {
    return $('//label[text()="Last Name:"]/parent::div/span');
  }

  get emailError() {
    return $('//label[text()="E-Mail:"]/parent::div/span');
  }

  get address1Error() {
    return $('//label[text()="Address 1:"]/parent::div/span');
  }

  get cityError() {
    return $('//label[text()="City:"]/parent::div/span');
  }

  get stateError() {
    return $('//label[text()="Region / State:"]/parent::div/span');
  }

  get zipError() {
    return $('//label[text()="ZIP Code:"]/parent::div/span');
  }

  get loginNameError() {
    return $('//label[text()="Login name:"]/parent::div/span');
  }

  get passwordError() {
    return $('//label[text()="Password:"]/parent::div/span');
  }

  get confirmPasswordError() {
    return $('//label[text()="Password Confirm:"]/parent::div/span');
  }

  async verifyFormError(){
    await expect(this.firstNameError).toHaveText('First Name must be between 1 and 32 characters!')
    await expect(this.lastNameError).toHaveText('Last Name must be between 1 and 32 characters!')
    await expect(this.emailError).toHaveText('Email Address does not appear to be valid!')
    await expect(this.address1Error).toHaveText('Address 1 must be between 3 and 128 characters!')
    await expect(this.cityError).toHaveText('City must be between 3 and 128 characters!')
    await expect(this.stateError).toHaveText('Please select a region / state!')
    await expect(this.zipError).toHaveText('Zip/postal code must be between 3 and 10 characters!')
    await expect(this.loginNameError).toHaveText('Login name must be alphanumeric only and between 5 and 64 characters!')
    await expect(this.passwordError).toHaveText('Password must be between 4 and 20 characters!')
    //await expect(this.confirmPasswordError).toHaveText('Password confirmation does not match password!')
  }
}

export default new FormErrorElements();
