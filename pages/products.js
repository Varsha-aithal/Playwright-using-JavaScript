exports.ProductsPage = class ProductsPage {
    constructor(page) {
        this.page = page;
        //Product List
        this.productList = page.locator('.product-list-table > tbody > tr');

        //Inputs
        this.productSearchInput = page.getByRole('textbox', { name: 'Filter by product name' });
        this.productNameInput = page.getByTestId('product-textbox');
        this.productPriceInput = page.getByTestId('price-textbox');
        this.productDateStockedInput = page.getByTestId('date-stocked');

        //Buttons
        this.showMoreButton = page.getByTestId('show-more-button')
        this.addAProductButton =page.getByTestId('add-a-product-button')
        this.editProductButton = page.getByTestId('edit-button')
        this.updateProductButton = page.getByTestId('submit-form')
        this.cancelButton = page.getByTestId('cancel-button')
        this.filterSubmitButton = page.getByTestId('filter-button')
        this.filterResetButton = page.getByTestId('reset-filter-button')   
    }

    async gotoProductsPage() {
        await this.page.goto('https://commitquality.com/');
    }
    async gotoAddProductPage() {
        await this.addAProductButton.click();
        await this.page.goto('https://commitquality.com/add-product')
    }
    async filterProducts(searchText) {
        await this.productSearchInput.fill(searchText);
        await this.filterSubmitButton.click();
    }
    async resetFilterProducts(searchText) {
        await this.productSearchInput.fill(searchText);
        await this.filterResetButton.click();
    }
    async updateProduct(productName, productPrice, dateStocked) {
        await this.productNameInput.fill(productName);
        await this.productPriceInput.fill(productPrice);
        await this.productDateStockedInput.fill(dateStocked);
        await this.updateProductButton.click();
    }

    async addNewProduct(productName, productPrice, dateStocked) {
        await this.productNameInput.fill(productName);
        await this.productPriceInput.fill(productPrice);
        await this.productDateStockedInput.fill(dateStocked);
        await this.updateProductButton.click();
    }

    async cancelAddProduct(productName, productPrice, dateStocked) {
        await this.productNameInput.fill(productName);
        await this.productPriceInput.fill(productPrice);
        await this.productDateStockedInput.fill(dateStocked);
        await this.cancelButton.click();
    }
}