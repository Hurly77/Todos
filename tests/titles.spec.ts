import { test, expect } from "@playwright/test";

test("Tasks /* titles", async ({ page, baseURL }) => {
  await page.goto((baseURL ?? "") + "/tasks");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Today - Toduit/);
  await page.getByLabel("Important").click();
  await expect(page).toHaveTitle(/Important - Toduit/);
  await page.getByLabel("Planned").click();
  await expect(page).toHaveTitle(/Planned - Toduit/);
  await page.getByLabel("All Tasks").click();
  await expect(page).toHaveTitle(/Tasks - Toduit/);
});
