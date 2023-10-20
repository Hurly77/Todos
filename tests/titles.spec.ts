import { test, expect } from "@playwright/test";

test("Tasks /* titles", async ({ page, baseURL }) => {
  await page.goto((baseURL || "http://localhost:3000") + "/tasks");

  const storage = await page.context().storageState();
  console.log("STORAGE", storage.origins[0].localStorage);

  const session = await page.evaluate(async () => {
    return localStorage;
  });

  console.log("SESSION", session);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Today - Toduit/);
  await page.getByLabel("Important").click();
  await expect(page).toHaveTitle(/Important - Toduit/);
  await page.getByLabel("Planned").click();
  await expect(page).toHaveTitle(/Planned - Toduit/);
  await page.getByLabel("All Tasks").click();
  await expect(page).toHaveTitle(/Tasks - Toduit/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
});
