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

  isDefined(obj) {
    if (typeof obj == 'undefined') {
        return false;
    }

    if (!obj) {
        return false;
    }

    return obj != null;
}

  request.on('response', (response) => {
    if (this.isDefined(response.result) && this.isDefined(response.result.fulfillment)) {
        messenger.sendTextMessage(senderID, response.result.fulfillment.speech);
    }        
  });
  request.on('error', (error) => {
    console.log(error);
  });
  request.end();
}
