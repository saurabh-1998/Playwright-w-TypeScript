import {test, Browser, Page, expect, Locator, BrowserContext} from '@playwright/test'
import { chromium, webkit, firefox } from '@playwright/test'

test('login test', async()=>{
    //open browser in incognito mode
    //const browser:Browser = await chromium.launch({headless: false, channel: 'chrome'});

    //open browser in normal mode
    const browser:BrowserContext = await chromium.launchPersistentContext('',{headless: false, channel: 'chrome'});

    const pages = browser.pages();
    const page:Page = pages[0];
    //const page:Page = await browser.newPage();
    await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/login");
    
    const emailId:Locator = page.locator('#input-email');
    const passwrd:Locator = page.locator('#input-password');
    const loginbtn:Locator = page.locator("[value='Login']");

    await emailId.fill("cusat.sk7@gmail.com");
    await passwrd.fill("sourya@1998");
    await loginbtn.click();

    const title = await page.title();
    console.log("Homepage Title: ", title);

    await page.screenshot({path: 'homepage.png'})

    expect(title).toEqual('My Account');

    await page.waitForTimeout(3000);

    await browser.close();

    //await new Promise(() => {});  //prevents script from exiting
});