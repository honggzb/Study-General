import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display all headings Text', () => {
    page.navigateTo();
    page.GetFirstHeading();
    page.GetAllHeadings();
    //browser.sleep(5000);
  });

  it('should navigate to first course details page', () => {
    page.ClickFirstHeading();
    //browser.sleep(5000);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
