class LoginDialog {

    constructor(page) {
        this.page = page;
    }
    
    async openDialog() {
        await this.page.click('[data-cy=login-button]');
        await this.page.waitFor('input[name=username]');
    }

    async enterCredentials(user, password) {
        await this.page.type('input[name=username]', user);
        await this.page.type('input[name=password]', password);
    }

    async logIn() {
        await Promise.all([
            await this.page.click('button[type=submit]'),
            this.page.waitForNavigation()
          ]);
      
        await this.page.waitFor('.btn-navbar.btn-navbar-username.hidden-xs.hidden-sm');
    }
    
}

module.exports = LoginDialog;