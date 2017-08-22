import engineEngilish from './engineEnglish';

const config = require('config');
const franc = require('franc');
const FBMessenger = require('fb-messenger');


// Generate a page access token for your page from the App Dashboard
const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
  (process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
  config.get('pageAccessToken');
const messenger = new FBMessenger(PAGE_ACCESS_TOKEN);

export const handlerEngine = (data) => {
  const senderID = data.sender.id;
  const pageID = data.recipient.id;
  const timeOfMessage = data.timestamp;
  const message = data.message;
  const userProfile = '';

  const readableMessage = message.text;
  const lang = franc(readableMessage, { minLength: 3, whitelist: ['eng', 'ind'] });

  console.log('[receivedMessage] user (%d) page (%d) timestamp (%d) and message (%s)',
    senderID, pageID, timeOfMessage, JSON.stringify(message));

  engineEngilish(data);
};

export default handlerEngine;
