import { test, expect } from "@playwright/test";

test("Can navigate to Index Page", async ({ page, baseURL }) => {
  await page.goto(baseURL || "http://localhost:3000");

  await expect(page.getByText("Get Started")).toBeVisible();
});
