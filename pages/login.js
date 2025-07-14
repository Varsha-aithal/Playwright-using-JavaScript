exports.LoginPage = class LoginPage{
    constructor(page){
        this.page = page;
        this.usernameField = page.getByTestId('username-textbox');
        this.passwordField = page.getByTestId('password-textbox');
        this.loginButton = page.getByTestId('login-button');
        
    }
    async gotoLoginPage(){
        await this.page.goto('https://commitquality.com/login');
    }
    async validateLogin(username, password){
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}