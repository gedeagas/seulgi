import { PAGE_ACCESS_TOKEN } from './token';

const apiai = require('apiai');
const FBMessenger = require('fb-messenger');

const messenger = new FBMessenger(PAGE_ACCESS_TOKEN);
const app = apiai('73f11a6d692146bdb9708b4e434e7ec9');

export default function engineEnglish(data) {
  const senderID = data.sender.id;
  const request = app.textRequest(data.message.text, {
    sessionId: senderID,
  });
  request.on('response', (response) => {
    messenger.sendTextMessage(senderID, response.fulfillment.speech);
  });
  request.on('error', (error) => {
    console.log(error);
  });
  request.end();
}
