class ProductDetailsPage {

    constructor(page) {
        this.page = page;
    }
    
    async priceIsNotVisible() {
        await this.page.$('.obfuscated-price-cover');
    }

    async priceIsVisible() {
        await this.page.waitForSelector('button.add-to-cart-btn', { timeout: 1000 })

        const element = await this.page.$('span[data-cy=product-details-product-price-on-add-to-cart-button]');
        const price = await this.page.evaluate(element => element.innerText, element);
        expect(price[0]).toBe('$');
    }
    
}

module.exports = ProductDetailsPage;