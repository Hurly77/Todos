import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/session.json";

setup("authenticate failed", async ({ page, baseURL }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(baseURL + "/auth/login");
  console.log("AUTH", process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);
  await page.getByLabel("Email").fill(process.env.TEST_USER_EMAIL ?? "");
  await page.getByLabel("Password").fill("wrong password");
  await page.getByRole("button", { name: "Login" }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await expect(page.getByLabel("auth-error")).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});

setup("authenticate", async ({ page, baseURL }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(baseURL + "/auth/login");
  console.log("AUTH", process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);
  await page.getByLabel("Email").fill(process.env.TEST_USER_EMAIL ?? "");
  await page.getByLabel("Password").fill(process.env.TEST_USER_PASSWORD ?? "");
  await page.getByRole("button", { name: "Login" }).click();
  // Wait until the page receives the cookies.

  await expect(page.getByLabel("auth-error")).not.toBeVisible();
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL(baseURL + "/tasks");
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByLabel("Brand Label")).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
