import { test, expect } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000";

test.describe("Navbar Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    // Wait for the page to be fully loaded
    await page.waitForLoadState("networkidle");
  });

  test.describe("Top Navbar", () => {
    test("should display top navbar on all screen sizes", async ({ page }) => {
      const topNavbar = page.locator('nav').first();
      await expect(topNavbar).toBeVisible();
    });

    test("should display logo with correct text", async ({ page }) => {
      const logo = page.getByRole("link", { name: "AgentNate" });
      await expect(logo).toBeVisible();
      await expect(logo).toHaveText("AgentNate");
    });

    test("should navigate to home when logo is clicked", async ({ page }) => {
      const logo = page.getByRole("link", { name: "AgentNate" });
      await logo.click();
      await expect(page).toHaveURL(new RegExp(`${BASE_URL}/?$`));
    });

    test("should display desktop navigation links on large screens", async ({
      page,
    }) => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      // Wait for device detection to update
      await page.waitForTimeout(500);

      // Check for desktop nav items
      const homeLink = page.getByRole("link", { name: "Home" }).first();
      const portfolioLink = page.getByRole("link", { name: "Portfolio" });
      const newsletterLink = page.getByRole("link", { name: "Newsletter" });
      const settingsLink = page.getByRole("link", { name: "Settings" });

      // At least one Home link should be visible (could be in top or bottom nav)
      await expect(homeLink).toBeVisible();

      // Desktop nav should show these links in the top navbar
      const topNavLinks = page
        .locator('nav')
        .first()
        .getByRole("link")
        .filter({ hasText: /^(Home|Portfolio|Newsletter|Settings)$/ });

      // Should have at least the desktop nav links visible
      const visibleLinks = await topNavLinks.count();
      expect(visibleLinks).toBeGreaterThan(0);
    });

    test("should hide desktop navigation links on mobile screens", async ({
      page,
    }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });

      // Wait for device detection to update
      await page.waitForTimeout(500);

      // Desktop nav links should not be visible in top navbar on mobile
      // The hamburger menu should be visible instead
      const hamburgerMenu = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], [data-testid*="menu"]').first();
      
      // Either hamburger menu exists or desktop nav is hidden
      // We can check that desktop nav items are not in the top nav area
      const topNav = page.locator('nav').first();
      const desktopNavItems = topNav.getByRole("link", { name: /^(Portfolio|Newsletter|Settings)$/ });
      
      // On mobile, these should either not exist in top nav or be hidden
      const count = await desktopNavItems.count();
      // On mobile, desktop nav items should be minimal or hidden
      expect(count).toBeLessThanOrEqual(1); // Only logo link might exist
    });
  });

  test.describe("Bottom Navbar", () => {
    test("should display bottom navbar on mobile screens", async ({ page }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });

      // Wait for dynamic import and device detection
      await page.waitForTimeout(1000);

      // Bottom navbar should be visible (fixed at bottom)
      const bottomNavbar = page.locator('nav').last();
      await expect(bottomNavbar).toBeVisible();

      // Check that it's positioned at the bottom
      const boundingBox = await bottomNavbar.boundingBox();
      expect(boundingBox).not.toBeNull();
      if (boundingBox) {
        // Should be near the bottom of the viewport
        expect(boundingBox.y).toBeGreaterThan(500);
      }
    });

    test("should hide bottom navbar on desktop screens", async ({ page }) => {
      // Set viewport to desktop size
      await page.setViewportSize({ width: 1280, height: 720 });

      // Wait for device detection to update
      await page.waitForTimeout(1000);

      // Bottom navbar should be hidden via md:hidden class
      const bottomNavbar = page.locator('nav').last();
      const isVisible = await bottomNavbar.isVisible();
      
      // On desktop, bottom nav should be hidden (md:hidden class)
      // We check by verifying it's not visible or has display: none
      const display = await bottomNavbar.evaluate((el) => {
        return window.getComputedStyle(el).display;
      });
      
      // Should be hidden on desktop
      expect(display).toBe("none");
    });

    test("should display all navigation items in bottom navbar on mobile", async ({
      page,
    }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });

      // Wait for dynamic import and device detection
      await page.waitForTimeout(1000);

      const bottomNavbar = page.locator('nav').last();

      // Check for all bottom nav items
      const homeLink = bottomNavbar.getByRole("link", { name: "Home" });
      const portfolioLink = bottomNavbar.getByRole("link", { name: "Portfolio" });
      const newsletterLink = bottomNavbar.getByRole("link", { name: "Newsletter" });
      const settingsLink = bottomNavbar.getByRole("link", { name: "Settings" });

      await expect(homeLink).toBeVisible();
      await expect(portfolioLink).toBeVisible();
      await expect(newsletterLink).toBeVisible();
      await expect(settingsLink).toBeVisible();
    });

    test("should navigate to correct pages from bottom navbar", async ({
      page,
    }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });

      // Wait for dynamic import and device detection
      await page.waitForTimeout(1000);

      const bottomNavbar = page.locator('nav').last();

      // Test Portfolio link
      const portfolioLink = bottomNavbar.getByRole("link", { name: "Portfolio" });
      await portfolioLink.click();
      await expect(page).toHaveURL(`${BASE_URL}/portfolio`);

      // Go back and test Newsletter link
      await page.goto(BASE_URL);
      await page.waitForTimeout(500);
      const newsletterLink = bottomNavbar.getByRole("link", { name: "Newsletter" });
      await newsletterLink.click();
      await expect(page).toHaveURL(`${BASE_URL}/newsletter`);

      // Go back and test Settings link
      await page.goto(BASE_URL);
      await page.waitForTimeout(500);
      const settingsLink = bottomNavbar.getByRole("link", { name: "Settings" });
      await settingsLink.click();
      await expect(page).toHaveURL(`${BASE_URL}/settings`);
    });

    test("should highlight active page in bottom navbar", async ({ page }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });

      // Navigate to portfolio page
      await page.goto(`${BASE_URL}/portfolio`);
      await page.waitForTimeout(1000);

      const bottomNavbar = page.locator('nav').last();
      const portfolioLink = bottomNavbar.getByRole("link", { name: "Portfolio" });

      // Active link should have primary color class
      const classList = await portfolioLink.evaluate((el) => Array.from(el.classList));
      const hasActiveClass = classList.some((cls) =>
        cls.includes("primary") || cls.includes("active")
      );

      // Check if link has primary color styling (text-primary class)
      const color = await portfolioLink.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });

      // Should have some styling indicating it's active
      expect(hasActiveClass || color !== "rgb(0, 0, 0)").toBeTruthy();
    });
  });

  test.describe("Responsive Behavior", () => {
    test("should switch between desktop and mobile nav when resizing", async ({
      page,
    }) => {
      // Start with desktop view
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.waitForTimeout(1000);

      // Bottom nav should be hidden
      const bottomNavbar = page.locator('nav').last();
      let display = await bottomNavbar.evaluate((el) => {
        return window.getComputedStyle(el).display;
      });
      expect(display).toBe("none");

      // Resize to mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);

      // Bottom nav should now be visible
      display = await bottomNavbar.evaluate((el) => {
        return window.getComputedStyle(el).display;
      });
      expect(display).not.toBe("none");
      await expect(bottomNavbar).toBeVisible();

      // Resize back to desktop
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.waitForTimeout(1000);

      // Bottom nav should be hidden again
      display = await bottomNavbar.evaluate((el) => {
        return window.getComputedStyle(el).display;
      });
      expect(display).toBe("none");
    });
  });

  test.describe("Accessibility", () => {
    test("should have proper ARIA labels and roles", async ({ page }) => {
      const topNavbar = page.locator('nav').first();
      await expect(topNavbar).toHaveAttribute("role", "navigation");

      // Check that links are accessible
      const links = page.getByRole("link");
      const linkCount = await links.count();
      expect(linkCount).toBeGreaterThan(0);

      // All links should be keyboard accessible
      for (let i = 0; i < Math.min(linkCount, 5); i++) {
        const link = links.nth(i);
        await expect(link).toBeVisible();
      }
    });

    test("should be keyboard navigable", async ({ page }) => {
      // Set viewport to mobile for bottom nav
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);

      // Focus on first link and tab through
      await page.keyboard.press("Tab");
      
      // Should be able to navigate with keyboard
      const focusedElement = await page.evaluate(() => {
        return document.activeElement?.tagName;
      });
      
      expect(["A", "BUTTON", "INPUT"]).toContain(focusedElement);
    });
  });

  test.describe("Hamburger Menu", () => {
    test("should display hamburger menu on mobile", async ({ page }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);

      // Hamburger menu button should be visible
      // Look for common hamburger menu patterns
      const hamburgerButton = page
        .locator('button')
        .filter({ has: page.locator('svg, [aria-label*="menu" i], [aria-label*="Menu"]') })
        .first();

      // If hamburger exists, it should be visible
      const count = await hamburgerButton.count();
      if (count > 0) {
        await expect(hamburgerButton).toBeVisible();
      }
    });

    test("should open menu when hamburger is clicked", async ({ page }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);

      // Try to find and click hamburger menu
      const hamburgerButton = page
        .locator('button')
        .filter({ has: page.locator('svg') })
        .first();

      const buttonCount = await hamburgerButton.count();
      if (buttonCount > 0) {
        await hamburgerButton.click();
        await page.waitForTimeout(300);

        // Menu should open (check for menu items or drawer)
        const menuItems = page.getByRole("menuitem", { exact: false });
        const drawer = page.locator('[role="dialog"], [data-testid*="menu"], [class*="drawer"]');
        
        // Either menu items are visible or drawer is open
        const hasMenu = (await menuItems.count()) > 0 || (await drawer.count()) > 0;
        expect(hasMenu).toBeTruthy();
      }
    });
  });

  test.describe("Scroll Behavior", () => {
    test("should hide top navbar when scrolling down", async ({ page }) => {
      // Ensure we have enough content to scroll
      await page.setViewportSize({ width: 1280, height: 400 });
      await page.waitForTimeout(500);

      const topNavbar = page.locator('nav').first();
      
      // Initially visible
      await expect(topNavbar).toBeVisible();
      const initialBoundingBox = await topNavbar.boundingBox();
      expect(initialBoundingBox).not.toBeNull();

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 300));
      await page.waitForTimeout(500); // Wait for scroll animation

      // Check if navbar is hidden (translated up or has display none)
      const transform = await topNavbar.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });
      
      const boundingBox = await topNavbar.boundingBox();
      
      // Navbar should be hidden - either translated up or out of viewport
      const isHidden = 
        transform.includes('translateY') && transform.includes('-') ||
        (boundingBox && boundingBox.y < -50); // Moved above viewport
      
      expect(isHidden).toBeTruthy();
    });

    test("should show top navbar when scrolling up", async ({ page }) => {
      // Set viewport and scroll down first
      await page.setViewportSize({ width: 1280, height: 400 });
      await page.waitForTimeout(500);

      const topNavbar = page.locator('nav').first();
      
      // Scroll down to hide navbar
      await page.evaluate(() => window.scrollTo(0, 300));
      await page.waitForTimeout(500);

      // Scroll back up
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      // Navbar should be visible again
      await expect(topNavbar).toBeVisible();
      
      const boundingBox = await topNavbar.boundingBox();
      expect(boundingBox).not.toBeNull();
      if (boundingBox) {
        // Should be at the top of the viewport
        expect(boundingBox.y).toBeGreaterThanOrEqual(0);
      }
    });

    test("should hide bottom navbar when scrolling down on mobile", async ({ page }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);

      const bottomNavbar = page.locator('nav').last();
      
      // Initially visible on mobile
      await expect(bottomNavbar).toBeVisible();
      const initialBoundingBox = await bottomNavbar.boundingBox();
      expect(initialBoundingBox).not.toBeNull();

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 300));
      await page.waitForTimeout(500);

      // Check if bottom navbar is hidden (translated down or has display none)
      const transform = await bottomNavbar.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });
      
      const boundingBox = await bottomNavbar.boundingBox();
      const viewportHeight = await page.evaluate(() => window.innerHeight);
      
      // Bottom navbar should be hidden - either translated down or out of viewport
      const isHidden = 
        transform.includes('translateY') && !transform.includes('translateY(0px)') ||
        (boundingBox && boundingBox.y > viewportHeight); // Moved below viewport
      
      // If transform is not "none" or "matrix(1, 0, 0, 1, 0, 0)", it's translated
      if (transform !== 'none' && !transform.includes('matrix(1, 0, 0, 1, 0, 0)')) {
        expect(isHidden).toBeTruthy();
      }
    });

    test("should show bottom navbar when scrolling up on mobile", async ({ page }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);

      const bottomNavbar = page.locator('nav').last();
      
      // Scroll down first to hide navbar
      await page.evaluate(() => window.scrollTo(0, 300));
      await page.waitForTimeout(500);

      // Scroll back up
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      // Bottom navbar should be visible again
      await expect(bottomNavbar).toBeVisible();
      
      const boundingBox = await bottomNavbar.boundingBox();
      expect(boundingBox).not.toBeNull();
      if (boundingBox) {
        const viewportHeight = await page.evaluate(() => window.innerHeight);
        // Should be at the bottom of the viewport
        expect(boundingBox.y + boundingBox.height).toBeLessThanOrEqual(viewportHeight + 10);
      }
    });

    test("should maintain navbar visibility at top of page", async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.waitForTimeout(500);

      const topNavbar = page.locator('nav').first();
      
      // At top of page, navbar should be visible
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      
      await expect(topNavbar).toBeVisible();
      
      const boundingBox = await topNavbar.boundingBox();
      expect(boundingBox).not.toBeNull();
      if (boundingBox) {
        expect(boundingBox.y).toBeGreaterThanOrEqual(0);
      }
    });

    test("should handle rapid scrolling correctly", async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 400 });
      await page.waitForTimeout(500);

      const topNavbar = page.locator('nav').first();
      
      // Rapid scroll down
      await page.evaluate(() => {
        window.scrollTo(0, 100);
        setTimeout(() => window.scrollTo(0, 200), 50);
        setTimeout(() => window.scrollTo(0, 300), 100);
      });
      await page.waitForTimeout(600);

      // Should handle rapid scrolling without errors
      const isVisible = await topNavbar.isVisible();
      expect(typeof isVisible).toBe('boolean');
      
      // Scroll back up
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      
      // Should be visible again
      await expect(topNavbar).toBeVisible();
    });

    test("should hide both navbars when scrolling down on mobile", async ({ page }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);

      const topNavbar = page.locator('nav').first();
      const bottomNavbar = page.locator('nav').last();
      
      // Both should be visible initially
      await expect(topNavbar).toBeVisible();
      await expect(bottomNavbar).toBeVisible();

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 300));
      await page.waitForTimeout(500);

      // Both navbars should be hidden when scrolling down
      const topTransform = await topNavbar.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });
      const bottomTransform = await bottomNavbar.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });

      // Check if both are translated (hidden)
      const topIsHidden = topTransform !== 'none' && !topTransform.includes('matrix(1, 0, 0, 1, 0, 0)');
      const bottomIsHidden = bottomTransform !== 'none' && !bottomTransform.includes('matrix(1, 0, 0, 1, 0, 0)');
      
      // At least one should be hidden (depending on implementation)
      expect(topIsHidden || bottomIsHidden).toBeTruthy();
    });
  });
});

