import { expect, test } from "@playwright/test";

test.describe("Claim dashboard", () => {
  test("loads claim summary and timeline in English", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByText("9239182380")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Process timeline" })).toBeVisible();
    await expect(page.getByText("Upload Occupational Certificate").first()).toBeVisible();
  });

  test("switches locale to Turkish", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "TR" }).click();
    await expect(page).toHaveURL(/\/tr/);
    await expect(page.getByText("Süreç zaman çizelgesi")).toBeVisible();
  });

  test("opens Explain with AI modal", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Explain with AI" }).first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("heading", { name: "Explain with AI" })).toBeVisible();
    await dialog.getByRole("button", { name: "Close" }).last().click();
  });
});
