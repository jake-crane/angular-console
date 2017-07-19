import { AngularConsolePage } from './app.po';

describe('angular-console App', () => {
  let page: AngularConsolePage;

  beforeEach(() => {
    page = new AngularConsolePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
