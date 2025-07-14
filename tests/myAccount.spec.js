import { test, expect } from '@playwright/test';
import { MyAccountPage } from '../pages/myAccount';
import { LoginPage } from '../pages/login';

test('Validate My Account Page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.validateLogin('test', 'test');

    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.clickOnMyAccountNavMenu();

    // Validate initial state
    await expect(page.getByRole('heading', { name: 'My Account' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'My Details' })).toBeVisible();
    await expect(myAccountPage.accountName).toHaveText('Name:');
    await expect(myAccountPage.youtubeName).toHaveText('Youtube Name:');
    await expect(myAccountPage.channelUrl).toHaveText('Youtube Link');

});

test('Validate Update My Account Details', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.validateLogin('test', 'test');

    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.clickOnMyAccountNavMenu();
    await myAccountPage.toggleUpdateButton.click();

    // Update details
    await myAccountPage.updateDetails('New Name', 'New Youtube Channel');

    const nameElement = page.locator('css=.details-list > li:nth-of-type(1)');
    const youtubeElement = page.locator('css=.details-list > li:nth-of-type(2)');

    await expect(nameElement).toHaveText(`Name: New Name`);
    await expect(youtubeElement).toHaveText(`Youtube Name: New Youtube Channel`);


});