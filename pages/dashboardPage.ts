import {Page} from "@playwright/test";

export class DashboardPage {
    readonly page: Page;        

    constructor(page: Page) {
        this.page = page;
    }

        get dashboardHeading() {
        return this.page.getByRole('heading', {name: 'Dashboard'});
    }

}