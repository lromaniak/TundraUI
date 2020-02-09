const puppeteer = require('puppeteer');
const LoginDialog = require('../pages/loginDialog');
const SearchPage = require('../pages/searchPage');
const ProductDetailsPage = require('../pages/productDetailsPage');

describe('Product Component', () => {

  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      //headless: false,
      //slowMo: 50,
      args: ['--start-fullscreen']
    });
    page = await browser.newPage();
    await page.setViewport({
      width: 1366,
      height: 768
    });
    await page.goto('https://www.tundra.com/search?q=*&c=USA​');
    await page.waitFor('#search-input-text');
  });

  afterEach(async () => {
    await browser.close();
  });

  it('Log in is successful"', async () => {
    const loginDialog = new LoginDialog(page);

    await loginDialog.openDialog();
    await loginDialog.enterCredentials('test-tundra.bnc2vaxu@mailosaur.io', 'Testing!123');
    await loginDialog.logIn();

    const pageTitle = await page.title();
    expect(pageTitle).toBe('Tundra | Wholesale Without the Hassle');
  });

  it('Search returns valid products', async () => {
    const searchPage = new SearchPage(page);

    await searchPage.performSearch('mantle');
    await searchPage.checkResults('43 results for mantle');

    await searchPage.selectFreeShipping();
    await searchPage.verifyAllProductsHasFreeShipping();
  });

  it('Filter Products by Free Shipping', async () => {
    const searchPage = new SearchPage(page);

    await searchPage.performSearch('jelly');

    await searchPage.selectFreeShipping();
    await searchPage.verifyAllProductsHasFreeShipping();
  });

  it('Sort Products by Price', async () => {
    const searchPage = new SearchPage(page);
    const loginDialog = new LoginDialog(page);

    await loginDialog.openDialog();
    await loginDialog.enterCredentials('test-tundra.bnc2vaxu@mailosaur.io', 'Testing!123');
    await loginDialog.logIn();

    await searchPage.performSearch('leather bag');

    await searchPage.sortByLowestPrice();
    await searchPage.checkIfPricesAreSorted();
  });

  it('Not logged user is not able to see product price', async () => {
    const searchPage = new SearchPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await searchPage.performSearch('mantle');
    await searchPage.goToProductDetail();

    await productDetailsPage.priceIsNotVisible();
  });

  it('Logged user can see product price', async () => {
    const loginDialog = new LoginDialog(page);
    const searchPage = new SearchPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await loginDialog.openDialog();
    await loginDialog.enterCredentials('test-tundra.bnc2vaxu@mailosaur.io', 'Testing!123');
    await loginDialog.logIn();

    await searchPage.performSearch('mantle');
    await searchPage.goToProductDetail();

    await productDetailsPage.priceIsVisible();
  });

});