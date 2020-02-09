class SearchPage {

    constructor(page) {
        this.page = page;
    }
    
    async performSearch(input) {
        await this.page.type('#search-input-text', input);
        await this.page.keyboard.press('Enter');
        await this.page.waitForNavigation();
    }

    async checkResults(expectedResults) {
        const element = await this.page.$('div.ng-scope div[ng-if="ctrl.query"]');
        const text = await this.page.evaluate(element => element.innerText, element);
        expect(text).toBe(expectedResults);
    }

    async selectFreeShipping() {
        await this.page.evaluate(()=>document.querySelector('label[for=freeShipping]').click())
        await this.page.waitForNavigation();
    }

    async verifyAllProductsHasFreeShipping() {
        //get number of all products
        const allProducts = await this.page.$$('.productWidget-module__bodyContainer___3E5aU');
        expect(allProducts.length).not.toBe(0);

        //select all free shipping badges only from product section
        const allFreeShippings = await this.page.$$('product-widget-list[products="ctrl.products"] .icon-module__icon___3RFTW.productBadges-module__icon___2scq8.icon-module__iconSm___1cFVG');
        expect(allFreeShippings.length).not.toBe(0);

        //verify that all products are Free shipping
        expect(allProducts.length).toBe(allFreeShippings.length);
    }

    async goToProductDetail() {
        const links = await this.page.$$('.link-module__absolute___3OLI9');
        await Promise.all([
            await links[3].click(),
            this.page.waitForNavigation()
        ]);

        await this.page.waitFor('#reviews');
    }

    async sortByLowestPrice() {
        await this.page.select('select[name=product-sorting]', 'string:Lowest Price');
        await this.page.waitForResponse(response => response.url().includes('/api.amplitude.com'));
    }

    async checkIfPricesAreSorted() {
        const prices = await this.page.evaluate(() => Array.from(document.querySelectorAll('span[data-cy="product-widget-price-text"]'), element => element.textContent));

        var newPrices = prices.map(function(x) {
          x = x.substring(1);
          return parseFloat(x);
        });
    
        const isSorted = arr => arr.every((v,i,a) => !i || a[i-1] <= v);
        expect(isSorted(newPrices)).toBeTruthy();
    }
    
}

module.exports = SearchPage;