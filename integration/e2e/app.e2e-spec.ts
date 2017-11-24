import {browser, by, element} from 'protractor';

describe('Micro-Dash E2E Tests', function () {
  beforeAll(() => browser.waitForAngularEnabled(false));

  beforeEach(() => browser.get(''));

  afterEach(() => {
    browser.manage().logs().get('browser').then((browserLog: any[]) => {
      expect(browserLog).toEqual([]);
    });
  });

  it('should display kebab-case', async () => {
    expect(await element(by.css('.result')).getText()).toEqual('kebab-case');
  });
});
