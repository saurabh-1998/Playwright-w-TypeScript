import { expect, test } from "@playwright/test";
import RegisterPage from "../main/RegisterPage";
import LoginPage from "../main/LoginPage";
import Homepage from "../main/Homepage";
import Productpage from "../main/Productpage";

const email="sourya123@gmail.com";
const password = "Sk@123";

test("Register Test_01", async({page, baseURL}) =>{
    const register = new RegisterPage(page);
    await page.goto(`${baseURL}route=account/register`);
    await register.enterFirstName("Sourya");
    await register.enterLastName("Singh");
    await register.enterRegisterEmail(email);
    await register.enterTelephone("1234567890");
    await register.enterRegisterPassword(password);
    await register.enterConfirmRegisterPassword(password);
    expect(register.isSubscribedChecked()).toBeChecked();
    await register.clickTermandCondition();
    await register.clickContinueBtn();
})

test("Login Test_02", async({page, baseURL}) =>{
    const login = new LoginPage(page);
    await page.goto(`${baseURL}route=account/login`);
    await login.enterLoginEmail(email);
    await login.enterLoginPassword(password);
    await login.clickLoginBtn();
    expect(await page.title()).toBe("My Account");
})

test("Add to cart Test_03", async({page, baseURL}) =>{
    const login = new LoginPage(page);
    const homepage = new Homepage(page);
    const product = new Productpage(page);
    await page.goto(`${baseURL}route=account/login`);
    await login.login(email, password);
    await homepage.clickSmartWatchMenu();
    await product.addproducttoCart();
    const isCartVisible = await product.isToastVisible();
    expect(isCartVisible).toBeVisible();
})

