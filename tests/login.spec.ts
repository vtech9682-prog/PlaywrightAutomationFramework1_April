import {test, expect} from '@playwright/test';
import {PageManager} from '../pages/pageManager';
import testData from '../testdata/testData.json';
import { ExcelUtil } from '../utils/excelUtils';

test("should login successfully and display the dashboard", async ({page}) => {
    const pm = new PageManager(page);
    await pm.loginPage.gotoLoginPage();
    await pm.loginPage.login(testData.username, testData.password);
    await expect(pm.dashboardPage.dashboardHeading).toBeVisible();
    
});

test("should display error message for invalid credentials", async ({page}) => {
    const pm = new PageManager(page);

    await pm.loginPage.gotoLoginPage();
    
    const userData= ExcelUtil.getData('./testdata/loginData.xlsx', 'InvalidLogin', 0)
    console.log(userData);
    await pm.loginPage.login(userData.username, userData.password);
    await expect(pm.loginPage.errorMessage).toBeVisible();

});

