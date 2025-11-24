import { test, expect } from "@playwright/test";
 
const BASE_URL = "https://www.saucedemo.com/";
 
 
 
test.describe("SauceDemo E2E UI Tests", () => {
 
  test("1. Login and validate successful redirection", async ({ page }) => {

    await page.goto(BASE_URL);
 
    await page.fill("#user-name", "standard_user");

    await page.fill("#password", "secret_sauce");

    await page.click("#login-button");
 
    await expect(page).toHaveURL(/inventory/);

    await expect(page.locator(".title")).toHaveText("Products");

  });
 
  test("2. Add 2 items and verify cart count", async ({ page }) => {

    await page.goto(BASE_URL);

    await page.fill("#user-name", "standard_user");

    await page.fill("#password", "secret_sauce");

    await page.click("#login-button");
 
    // Add items

    await page.click("#add-to-cart-sauce-labs-backpack");

    await page.click("#add-to-cart-sauce-labs-bike-light");
 
    const cartBadge = page.locator(".shopping_cart_badge");

    await expect(cartBadge).toHaveText("2");

  });
 
  test("3. Proceed to checkout & fill form", async ({ page }) => {

    await page.goto(BASE_URL);

    await page.fill("#user-name", "standard_user");

    await page.fill("#password", "secret_sauce");

    await page.click("#login-button");
 
    // Add items

    await page.click("#add-to-cart-sauce-labs-backpack");

    await page.click("#add-to-cart-sauce-labs-bike-light");
 
    // Go to cart

    await page.click(".shopping_cart_link");
 
    // Checkout

    await page.click("#checkout");
 
    await page.fill("#first-name", "John");

    await page.fill("#last-name", "Tester");

    await page.fill("#postal-code", "12345");
 
    await page.click("#continue");
 
    await expect(page.locator(".title")).toHaveText("Checkout: Overview");

  });
 
  test("4. Complete the order & validate success", async ({ page }) => {

    await page.goto(BASE_URL);

    await page.fill("#user-name", "standard_user");

    await page.fill("#password", "secret_sauce");

    await page.click("#login-button");
 
    await page.click("#add-to-cart-sauce-labs-backpack");

    await page.click("#add-to-cart-sauce-labs-bike-light");
 
    await page.click(".shopping_cart_link");

    await page.click("#checkout");
 
    await page.fill("#first-name", "John");

    await page.fill("#last-name", "Tester");

    await page.fill("#postal-code", "12345");

    await page.click("#continue");
 
    await page.click("#finish");
 
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");

  });
 
  test("5. Negative test: locked_out_user error handling", async ({ page }) => {

    await page.goto(BASE_URL);
 
    await page.fill("#user-name", "locked_out_user");

    await page.fill("#password", "secret_sauce");

    await page.click("#login-button");
 
    const errorEl = page.locator("[data-test='error']");

    await expect(errorEl).toContainText("Epic sadface: Sorry, this user has been locked out.");

  });
 
});
 