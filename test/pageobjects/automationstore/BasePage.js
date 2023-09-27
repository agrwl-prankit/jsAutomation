export default class BasePage{
    async open(url){
        return await browser.url(`${url}`)
    }
}