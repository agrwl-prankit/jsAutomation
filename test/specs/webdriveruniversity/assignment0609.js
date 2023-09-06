describe("",async()=>{

    before('open url', async() =>{
        await browser.maximizeWindow()
        await browser.url('http://www.webdriveruniversity.com/')
    })

    it('move to iframe tab', async() =>{
        const iFrame = await $('#iframe')
        await iFrame.click()
        await browser.switchWindow('http://www.webdriveruniversity.com/IFrame/index.html')
        await expect(browser).toHaveUrlContaining('IFrame')
        await expect(browser).toHaveTitleContaining('IFrame')
    })

    it('click on Our Product, get Product list and move to Home Page', async() =>{
        const parentWindow = await browser.getWindowHandle();
        const iframe = await $('#frame')
        await browser.switchToFrame(iframe)
        const ourProduct = await $('//a[text()="Our Products"]')
        await ourProduct.click()
        const productList = await $$('.sub-heading')
        console.log('Product List are:')
        for(let ele of productList){
            console.log(await ele.getText())
        }
        await browser.switchToWindow(parentWindow)
        const goToHomePageLink = await $('.navbar-brand')
        await goToHomePageLink.click()
    })

    it('open alert page', async() =>{
        const alertPageLink = await $('#popup-alerts')
        await alertPageLink.click()
        await browser.switchWindow('http://www.webdriveruniversity.com/Popup-Alerts/index.html')
        await expect(browser).toHaveUrlContaining('Popup-Alerts')
        await expect(browser).toHaveTitleContaining('Popups & Alerts')
    })

    it('javascript alert', async()=> {
        const jsAlertButton = await $('#button1')
        await jsAlertButton.click()
        const alertText = await browser.getAlertText()
        console.log("javascript alert text is: " + alertText)
        await browser.acceptAlert()
    })

    it('javascript Confirm box', async()=> {
        const modalPopup = await $('span[id="button4"]')
        await modalPopup.click()
        const confirmationBox = await browser.getAlertText()
        console.log("javascript Confirm box alert text is: " + confirmationBox)
        await browser.acceptAlert()
        let result = await $('p[id="confirm-alert-text"]')
        await expect(result).toHaveText('You pressed OK!')
        await modalPopup.click()
        await browser.dismissAlert()
        result = await $('p[id="confirm-alert-text"]')
        await expect(result).toHaveText('You pressed Cancel!')
    })

    it('move to Home Page and open File Upload page', async()=>{
        // const goToHomePageLink = await $('.navbar-brand')
        // await goToHomePageLink.click()
        const fileUploadLink = await $('#file-upload')
        await fileUploadLink.click()
        await browser.switchWindow('File Upload')
        await expect(browser).toHaveUrlContaining('File-Upload')
        await expect(browser).toHaveTitleContaining('File Upload')
    })

    it('upload file', async() =>{
        const chooseFileBtn = await $('#myFile')
        //await chooseFileBtn.click()
        const imagePath = 'D:\\testfiles\\pngimage.png'
        await chooseFileBtn.addValue(imagePath)
        const submitBtn = await $('#submit-button')
        submitBtn.click()
        const alertText = await browser.getAlertText()
        console.log("Alert text after upload file is: " + alertText)
        //await expect(alertText).toHaveValueContaining('Your file has now been uploaded!')
        await browser.acceptAlert()
    })

})