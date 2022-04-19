const { App } = require("@slack/bolt");
require("dotenv").config();
require ('../app.js');

jest.mock('@slack/bolt', () => {
  const mApp = {
    message: jest.fn(),
    action: jest.fn(),
    start: jest.fn(),
  };
  return { App: jest.fn(() => mApp) };
})

describe('test welcome bot', () => {
  let app = App;
  beforeAll(() => {
    app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    port: process.env.PORT || 3000,
  });
  });

  it('tests slack message', async () => {
    await app.start();
    expect(app.message).toBeCalledWith(/hello/i, expect.any(Function));
  });
});
