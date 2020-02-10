class SearchPage {

    constructor(page) {
        this.page = page;
    }

    async productHasGoldGuarantee() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('img[alt="Best Price Guaranteed"]'),el);
        expect(newEl).not.toBeNull();
    }

    async productHasNotGoldGuarantee() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('img[alt="Best Price Guaranteed"]'),el);
        expect(newEl).toBeNull();
    }

    async productHasGoldPlusGuarantee() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('img[alt="Best Price & On-Time Delivery Guaranteed"]'),el);
        expect(newEl).not.toBeNull();
    }

    async productHasNotGoldPlusGuarantee() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('img[alt="Best Price & On-Time Delivery Guaranteed"]'),el);
        expect(newEl).toBeNull();
    }

    async productIsOnSale() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('div[class*="onSale"]'),el);
        expect(newEl).not.toBeNull();
    }

    async productIsNotOnSale() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('div[class*="onSale"]'),el);
        expect(newEl).toBeNull();
    }

    async markAsFavouriteIsVisible() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('div[class*="favoriteIcon"]'),el);
        expect(newEl).not.toBeNull();
    }

    async markAsFavouriteIsNotVisible() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('div[class*="favoriteIcon"]'),el);
        expect(newEl).toBeNull();
    }

    async productAmountSelectorIsVisible() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('input[class*="MuiInputBase-input"]'),el);
        expect(newEl).not.toBeNull();
    }
  
    async productAmountSelectorIsNotVisible() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('input[class*="MuiInputBase-input"]'),el);
        expect(newEl).toBeNull();
    }
  
    async buttonAddToCardIsVisible() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('button[class*="productAddToCart-module"]'),el);
        expect(newEl).not.toBeNull();
    }
  
    async buttonAddToCardIsNotVisible() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('button[class*="productAddToCart-module"]'),el);
        expect(newEl).toBeNull();
    }
  
    async buttonChooseOptionsIsVisible() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('a[class*="chooseOptionsBtn"]'),el);
        expect(newEl).not.toBeNull();
    }
  
    async buttonChooseOptionsIsNotVisible() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('a[class*="chooseOptionsBtn"]'),el);
        expect(newEl).toBeNull();
    }

    async performSearch(input) {
        await this.page.type('#search-input-text', input);
        await this.page.keyboard.press('Enter');
        await this.page.waitForNavigation();
    }

    async productHasPicture() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('div[class*="imgContainer"]'),el);
        expect(newEl).not.toBeNull();
    }
   
    async productHasName() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('div[class*="productName"]'),el);
        expect(newEl).not.toBeNull();
    }
  
    async productHasSupplier() {
        const el = await this.page.$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        const newEl = await this.page.evaluate((el)=>el.querySelector('div[class*="supplierName"]'),el);
        expect(newEl).not.toBeNull();
    }

    async checkResults(expectedResults) {
        const element = await this.page.$('div.ng-scope div[ng-if="ctrl.query"]');
        const text = await this.page.evaluate(element => element.innerText, element);
        expect(text).toBe(expectedResults);
    }

    async filterFreeShipping() {
        await this.page.evaluate(()=>document.querySelector('label[for=freeShipping]').click())
        await this.page.waitForNavigation();
    }

    async filterOnSale() {
        await this.page.evaluate(()=>document.querySelector('label[for=onSale]').click())
        await this.page.waitForNavigation();
    }

    async filterGoldPlusGuarantee() {
        await this.page.evaluate(()=>document.querySelector('label[for=guaranteedDelivery]').click())
        await this.page.waitForNavigation();
    }

    async filterGoldGuarantee() {
        await this.page.evaluate(()=>document.querySelector('label[for=bestOffer]').click())
        await this.page.waitForNavigation();
    }

    async verifyAllProductsHasFreeShipping() {
        //get number of all products
        const allProducts = await this.page.$$('div[class*="productWidgetList-module"][class*="absolutePlaceholder-module"]');
        expect(allProducts.length).not.toBe(0);

        //select all free shipping badges only from product section
        const allFreeShippings = await this.page.$$('product-widget-list[products="ctrl.products"] .icon-module__icon___3RFTW.productBadges-module__icon___2scq8.icon-module__iconSm___1cFVG');
        expect(allFreeShippings.length).not.toBe(0);

        //verify that all products are Free shipping
        expect(allProducts.length).toBe(allFreeShippings.length);
    }

    async goToProductDetail() {
        const links = await this.page.$$('a[class*=link-module__absolute]');
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