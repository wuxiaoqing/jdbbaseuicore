import { JdbPlgUiModule } from './jdb-plg-ui.module';

describe('JdbPlgUiModule', () => {
  let jdbPlgUiModule: JdbPlgUiModule;

  beforeEach(() => {
    jdbPlgUiModule = new JdbPlgUiModule();
  });

  it('should create an instance', () => {
    expect(jdbPlgUiModule).toBeTruthy();
  });
});
