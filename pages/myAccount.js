exports.MyAccountPage = class MyAccountPage {
    constructor(page) {
        this.page = page;
        //Elements
        this.accountName = page.getByTestId('saved-name-info');
        this.youtubeName = page.getByTestId('saved-youtube-name-info');
        this.channelUrl = page.getByTestId('saved-youtube-channel-info');
        //Buttons
        this.toggleUpdateButton = page.locator('.toggle-details-button');
        this.saveButton = page.getByTestId('submit-data');
        //Pages
        this.myAccountNavMenu = page.getByTestId('navbar-account')
        //Inputs
        this.nameField = page.getByTestId('name-textbox')
        this.youtubeChannelField = page.getByTestId('yotuube-channel-textbox')
    }

    async clickOnMyAccountNavMenu() {
        await this.myAccountNavMenu.click();
    }
    async updateDetails(newName, newYoutubeChannel) {
        await this.nameField.fill(newName);
        await this.youtubeChannelField.fill(newYoutubeChannel);
        await this.saveButton.click();
    }
}
