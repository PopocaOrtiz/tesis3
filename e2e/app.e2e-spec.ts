import { Tesis3Page } from './app.po';

describe('tesis3 App', function() {
  let page: Tesis3Page;

  beforeEach(() => {
    page = new Tesis3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
