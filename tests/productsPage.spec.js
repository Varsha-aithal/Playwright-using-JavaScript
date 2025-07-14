import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/products.js';
import { LoginPage } from '../pages/login.js';


test('Validate Show More Button', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.gotoProductsPage();

    const isShowMoreButtonVisible = await productsPage.showMoreButton.isVisible();

    test.skip(!isShowMoreButtonVisible, '"Show More" button is not visible on the Products page');

    //Number of products displayed on the Products page
    const numberOfProducts = await productsPage.productList.count();
    //click on Show More button
    await productsPage.showMoreButton.click();
    //Number of Products displayed on the Products page after clicking Show More button
    const numberOfProductsAfterClick = await productsPage.productList.count();
    //Validate that the number of products displayed after clicking Show More button is greater than before
    expect(numberOfProductsAfterClick).toBeGreaterThan(numberOfProducts);
})

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.validateLogin('test', 'test');
});

test("Validate Add Product Button", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.gotoProductsPage();

    //Click on Add Product button
    await productsPage.addAProductButton.click();
    //Validate that the URL is correct after clicking Add Product button
    expect(page.url()).toBe('https://commitquality.com/add-product');
    //Fill in the product details
    const productName = 'Test Product123';
    const productPrice = '100';
    const dateStocked = '2023-10-01';
    await productsPage.addNewProduct(productName, productPrice, dateStocked);

    //Filter the products to find the newly added product
    await productsPage.filterProducts(productName);
    //Validate that the newly added product is displayed in the product list
    await expect(page.getByText(productName)).toBeVisible();
    await expect(page.getByText(productPrice)).toBeVisible();
    await expect(page.getByText(dateStocked)).toBeVisible();
})

test('Validate Filter Products', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.gotoProductsPage();

    //UNABLE TO FILTER SPECIFIC PRODUCT BECAUSE OF NO UNIQUE PRODUCT.

    //Filter the products that does not exist
    await productsPage.filterProducts("Product12345");
    //Validate that the non-existent product is not displayed in the product list
    await expect(page.getByText('No products found')).toBeVisible();

    await productsPage.resetFilterProducts("Test Reset Button");


    //Validate the filter is reset and the product list is visible again
    const numberOfProducts = await productsPage.productList.count();
    await expect(productsPage.productSearchInput).toBeEmpty();
    await expect(page.locator('.product-list-table')).toBeVisible();
    expect(numberOfProducts).toEqual(10);
})

test('Validate Edit Product Button', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.gotoProductsPage();

    // Clicking the edit button of Product Row 8
    const productEditButton = page.locator('tr[data-testid="product-row-8"] .edit-button');
    await productEditButton.click();

    //Values to Edit the existing Product
    const newProductName = "EditedProduct2"
    const newProductPrice = "155"
    const newProductDateStocked = "2021-01-30"

    await productsPage.updateProduct(newProductName, newProductPrice, newProductDateStocked);


    //Validate if the values match
    await expect(page.getByText(newProductName)).toBeVisible();
    await expect(page.getByText(newProductPrice)).toBeVisible();
    await expect(page.getByText(newProductDateStocked)).toBeVisible();

})

test('Validate Cancel Add Product Button', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.gotoProductsPage();

    //Click on Add Product button
    await productsPage.addAProductButton.click();
    //Fill in the product details
    const productName = 'Test Product123';
    const productPrice = '100';
    const dateStocked = '2023-10-01';
    await productsPage.cancelAddProduct(productName, productPrice, dateStocked);

    await expect(productsPage.productSearchInput).toBeVisible();
});