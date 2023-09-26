import { default as BasePage } from "./BasePage";

class ContactUsPage extends BasePage {
  open() {
    return super.open("Contact-Us/contactus.html");
  }

  get firstName() {
    return $('input[name="first_name"]');
  }

  get lastName() {
    return $('input[name="last_name"]');
  }

  get email() {
    return $('input[name="email"]');
  }

  get comment() {
    return $('textarea[name="message"]');
  }

  get submitBtn() {
    return $('input[type="submit"]');
  }

  async fillForm(first_name, last_name, email, comment) {
    await this.firstName.setValue(first_name);
    await this.lastName.setValue(last_name);
    await this.email.setValue(email);
    await this.comment.setValue(comment);

    (await this.submitBtn).click();
  }
}

module.exports = new ContactUsPage();
