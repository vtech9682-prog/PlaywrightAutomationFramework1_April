import {Page} from "@playwright/test";
import {LoginPage} from "./loginPage";
import { DashboardPage } from "./dashboardPage";
import { PimPage } from "./pimPage";
import { Helper } from "../utils/helper";

export class PageManager {
    readonly page: Page;
    readonly loginPage: LoginPage;
    readonly dashboardPage: DashboardPage;
    readonly pimPage: PimPage;
    readonly helper: Helper;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.pimPage = new PimPage(page);
        this.helper = new Helper();
    }

}

