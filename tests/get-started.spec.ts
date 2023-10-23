import { test, expect } from "@playwright/test";

test("Can navigate to Index Page", async ({ page, baseURL }) => {
  await page.goto(baseURL ?? "");

  await expect(page.getByText("Get Started")).toBeVisible();
});
