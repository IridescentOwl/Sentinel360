from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Give the server a moment to start up
    time.sleep(10)

    try:
        # Verify Main Page
        page.goto("http://localhost:3000/redesign")
        expect(page.get_by_text("Share Subscriptions, Save Effortlessly")).to_be_visible(timeout=15000)
        page.screenshot(path="jules-scratch/verification/main-page.png")

        # Verify Marketplace Page
        page.goto("http://localhost:3000/redesign/marketplace")
        expect(page.get_by_text("Explore available subscription groups")).to_be_visible(timeout=15000)
        page.screenshot(path="jules-scratch/verification/marketplace-page.png")

        # Verify Dashboard Page
        page.goto("http://localhost:3000/redesign/dashboard")
        expect(page.get_by_text("Welcome back, Alex")).to_be_visible(timeout=15000)
        page.screenshot(path="jules-scratch/verification/dashboard-page.png")

        # Verify Profile Page
        page.goto("http://localhost:3000/redesign/profile")
        expect(page.get_by_text("Profile & Settings")).to_be_visible(timeout=15000)
        page.screenshot(path="jules-scratch/verification/profile-page.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)