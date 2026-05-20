import {expect, test} from '@playwright/test';

test('End to End Test for OrangeHRM', async ({page}) => {
  // Navigate to the OrangeHRM login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Log in to the application
 await page.getByPlaceholder('Username').fill('Admin');
 await page.getByPlaceholder('Password').fill('admin123');
 await page.getByRole('button', {name: 'Login'}).click();

 await expect(page.getByRole('heading', {name: 'Dashboard'})).toBeVisible();
 await page.getByRole('link', {name: 'PIM'}).click();

 await expect(page.getByRole('heading', {name: 'PIM', exact: true})).toBeVisible();

 // Add a new employee
   await page.getByRole('button', {name: 'Add'}).click();

 await expect(page.getByText('Employee Full Name')).toBeVisible();
 await page.getByPlaceholder('First Name').fill('Jitesh');
 await page.getByPlaceholder('Last Name').fill('Sharma');
 

 const employeeId = page.locator('.oxd-input-group')
 .filter({has: page.locator('label', {hasText: 'Employee Id'})})
 .locator('.oxd-input.oxd-input--active');

 const employeeIdValue = await employeeId.inputValue();
 await employeeId.fill(employeeIdValue);

console.log('Generated Employee ID:', employeeIdValue);
await page.getByRole('button', {name: 'Save'}).click();
await expect(page.getByRole('heading', {name: 'Personal Details'})).toBeVisible();

//Fill the employee details`

 await page.getByRole('link', {name: 'PIM'}).click();
 await employeeId.fill(employeeIdValue);
 await page.getByRole('button', {name: 'Search'}).click();

 const employee = page.locator('.oxd-table-card').filter({hasText: employeeIdValue});

 await expect(employee).toBeVisible();

 await employee.click();

 await expect(page.getByRole('heading', {name: 'Personal Details'})).toBeVisible();

 await page.locator('.oxd-input-group')
 .filter({has: page.locator('label', {hasText: "Driver's License Number"})})
 .locator('.oxd-input.oxd-input--active').fill('DL123456');

//Normal way to handle cllendar
  await page.locator('.oxd-input-group')
 .filter({has: page.locator('label', {hasText: "License Expiry Date"})})
 .getByPlaceholder('yyyy-dd-mm').fill('2025-31-12');

   await expect(page.locator('.oxd-input-group')
 .filter({has: page.locator('label', {hasText: "License Expiry Date"})})
 .getByPlaceholder('yyyy-dd-mm')).toHaveValue('2025-31-12');

 // Alternative way to handle calendar

 const calendar = page.locator('.oxd-input-group')
 .filter({has: page.locator('label', {hasText: "Date of Birth"})})
 .getByPlaceholder('yyyy-dd-mm');

  await calendar.click();

const year= '1997';
const month = 'Jan';
const day = '15';
const calendarDropdown = page.locator('.oxd-date-input-calendar');
await calendarDropdown.waitFor({state: 'visible', timeout: 15000});

await calendarDropdown.getByText('2026').click();
await calendarDropdown.getByText(year).click();
await calendarDropdown.getByText('May').click();
await calendarDropdown.getByText(month).click();
await calendarDropdown.getByText(day).click();

await expect(calendar).toHaveValue('1997-15-01');
















 


 

 






 















});