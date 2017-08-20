const config = require('config');

/*
 * Open config/default.json and set your config values before running this code. 
 * You can also set them using environment variables.
 *
 */

// App Secret can be retrieved from the App Dashboard
export const APP_SECRET = (process.env.MESSENGER_APP_SECRET)
  ? process.env.MESSENGER_APP_SECRET
  : config.get('appSecret');

// Arbitrary value used to validate a webhook
export const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN)
  ? (process.env.MESSENGER_VALIDATION_TOKEN)
  : config.get('validationToken');

// Generate a page access token for your page from the App Dashboard
export const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN)
  ? (process.env.MESSENGER_PAGE_ACCESS_TOKEN)
  : config.get('pageAccessToken');

// making sure that everything has been properly configured
if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN)) {
  console.error('Missing config values');
  process.exit(1);
}
