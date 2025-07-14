import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/login';

test('Validate Successful Login', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.validateLogin('test', 'test');
    await expect(page.getByTestId('navbar-account')).toContainText('My Account');
})

test('Validate Unsuccessful Login', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.validateLogin('wrongusername', 'wrongpassword');
    await expect(page.locator('.error')).toHaveText('Invalid username or password');
})