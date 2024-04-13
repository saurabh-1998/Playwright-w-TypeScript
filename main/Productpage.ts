import { Page } from "playwright/test";
export default class Productpage{

    constructor(public page:Page){}
    
    async addproducttoCart(){
        await this.page.hover("xpath=//div[@class='image']/a", {
            strict:false});
        
        await this.page.locator("//button[@title='Add to Cart']")
            .nth(0).click();
    }

    async isToastVisible(){
        const toast = this.page.locator("//a[.='View Cart ']");
        //const toast = this.page.locator('//*[@id="notification-box-top"]/div/div[2]/div[2]/div[1]/a').filter({ hasText: 'View Cart '});
        //const toast = this.page.locator('#notification-box-top > div > div > div > p').filter({ hasText: 'Success: You have added '}).nth(1);
        await toast.waitFor({state:"visible"})
        return toast;
    }
}