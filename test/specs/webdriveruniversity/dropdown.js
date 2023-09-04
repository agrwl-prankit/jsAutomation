describe('Practice Dropdown', async()=> {
    before('', async() =>{
        await browser.maximizeWindow()
        await browser.url('http://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html')
    })

    it('select by attribute', async()=> {
        const dropdownMenu1 = await $('#dropdowm-menu-1')
        expect(dropdownMenu1).toHaveValue('JAVA')
        await dropdownMenu1.selectByAttribute('value', 'sql')
        expect(dropdownMenu1).toHaveValue('SQL')

        const dropdownMenu2 = await $('#dropdowm-menu-2')
        expect(dropdownMenu2).toHaveValue('Eclipse')
        await dropdownMenu2.selectByAttribute('value', 'testng')
        expect(dropdownMenu2).toHaveValue('TestNG')

        const dropdownMenu3 = await $('#dropdowm-menu-3')
        expect(dropdownMenu3).toHaveValue('HTML')
        await dropdownMenu3.selectByAttribute('value', 'javascript')
        expect(dropdownMenu3).toHaveValue('JavaScript')
        await browser.pause(1000)
    })

    it('select by index', async()=> {
        const dropdownMenu1 = await $('#dropdowm-menu-1')
        expect(dropdownMenu1).toHaveValue('SQL')
        await dropdownMenu1.selectByIndex(1)
        expect(dropdownMenu1).toHaveValue('C#')

        const dropdownMenu2 = await $('#dropdowm-menu-2')
        expect(dropdownMenu2).toHaveValue('TestNG')
        await dropdownMenu2.selectByIndex(3)
        expect(dropdownMenu2).toHaveValue('JUnit')

        const dropdownMenu3 = await $('#dropdowm-menu-3')
        expect(dropdownMenu3).toHaveValue('JavaScript')
        await dropdownMenu3.selectByIndex(1)
        expect(dropdownMenu3).toHaveValue('CSS')
        await browser.pause(1000)
    })

    it('select by visible text', async() => {
        const dropdownMenu1 = await $('#dropdowm-menu-1')
        expect(dropdownMenu1).toHaveValue('C#')
        await dropdownMenu1.selectByVisibleText('Python')
        expect(dropdownMenu1).toHaveValue('Python')

        const dropdownMenu2 = await $('#dropdowm-menu-2')
        expect(dropdownMenu2).toHaveValue('JUnit')
        await dropdownMenu2.selectByVisibleText('Maven')
        expect(dropdownMenu2).toHaveValue('Maven')

        const dropdownMenu3 = await $('#dropdowm-menu-3')
        expect(dropdownMenu3).toHaveValue('CSS')
        await dropdownMenu3.selectByVisibleText('JQuery')
        expect(dropdownMenu3).toHaveValue('JQuery')
        await browser.pause(1000)
    })

    it('navigate to Contact Us page via Home Page', async()=>{
        const btn1 = await $('.navbar-brand')
        await btn1.click()
        const contactUs = await $('#contact-us')
        await contactUs.waitUntil(async function () {
            return await browser.getUrl() === 'http://www.webdriveruniversity.com/index.html'
        })
        await contactUs.click()
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
        const contactUsTitle = await $('h2[name="contactme"]')
        await contactUsTitle.waitUntil(async function(){
            return await browser.getUrl() === 'http://www.webdriveruniversity.com/Contact-Us/contactus.html'
        })
    })

    it('Login on Contact Us Page', async() => {
        const firstName = await $('input[name="first_name"]')
        const lastName = await $('input[name="last_name"]')
        const email = await $('input[name="email"]')
        const comment = await $('textarea[name="message"]')
        const submitBtn = await $('input[type="submit"]')

        await firstName.setValue('Prankit')
        await lastName.setValue('Agarwal')
        await email.setValue('prankit@yopmail.com')
        await comment.setValue('for learning')
        await submitBtn.click()
    })

    it('validating success text', async() => {
        const successMsg = await $('//div[@id="contact_reply"]/h1')
        await successMsg.waitUntil(async function() {
            return await browser.getUrl() === 'http://www.webdriveruniversity.com/Contact-Us/contact-form-thank-you.html'
        })
        await expect(successMsg).toHaveText('Thank You for your Message!')
    })

    it('validating error message', async()=> {
        await browser.back()
        const contactUsTitle = await $('h2[name="contactme"]')
        await contactUsTitle.waitUntil(async function(){
            return await browser.getUrl() === 'http://www.webdriveruniversity.com/Contact-Us/contactus.html'
        })
        const resetBtn = await $('input[type="reset"]')
        await resetBtn.click()
        const submitBtn = await $('input[type="submit"]')
        await submitBtn.click()
        const errorMsg = await $('//body')
        await errorMsg.waitForDisplayed({timeout: 10000}, {interval: 2000})
        await expect(errorMsg).toHaveTextContaining('Error: all fields are required')
    })
})