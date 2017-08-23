import { PAGE_ACCESS_TOKEN } from './token';
import orderResolver from '../intentresolver/order';

const apiai = require('apiai');
const FBMessenger = require('fb-messenger');

const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://45.32.115.11');

const messenger = new FBMessenger(PAGE_ACCESS_TOKEN);
const app = apiai('525094bfeb3545c3aa54f53a2ea74bd7');

client.on('connect', () => {
  client.subscribe('lampu');
});


export default function engineEnglish(data) {
  const senderID = data.sender.id;
  const request = app.textRequest(data.message.text, {
    sessionId: senderID,
  });

  function isDefined(obj) {
    if (typeof obj === 'undefined') {
      return false;
    }

    if (!obj) {
      return false;
    }

    return obj != null;
  }

  request.on('response', (response) => {
    if (isDefined(response.result) && isDefined(response.result.fulfillment)) {
      if (response.result.action === 'lampu') {
        const speech = response.result.fulfillment.speech;
        if (response.result.parameters.status === 'matikan') {
          client.publish('lampu', 'off');
          messenger.sendTextMessage(senderID, `${speech}`);
          // console.log('trigger off');
        } else {
          client.publish('lampu', 'on');
          messenger.sendTextMessage(senderID, `${speech}`);
          // console.log('trigger on');
        }
      } else if (response.result.action === 'transactionorder.transactionorder-custom.transactionorder-whichone-yes') {
        messenger.getProfile(senderID, (err, body) => {
          const userProfile = body;
          const speech = response.result.fulfillment.speech;
          // console.log(orderResolver(userProfile, data, response));
          messenger.sendTextMessage(senderID, `Okay ${userProfile.first_name}, ${speech}`);
          messenger.sendReceiptMessage(senderID, orderResolver(userProfile, data, response), (err, databody) => {
            if (err) return console.error(err);
            // console.log(databody);
          });
        });
      } else if (response.result.metadata.intentName === 'smalltalk.agent.beautiful') {
        messenger.getProfile(senderID, (err, body) => {
          const userProfile = body;
          const speech = response.result.fulfillment.speech;

          messenger.sendTextMessage(senderID, `${speech} ${userProfile.first_name}`);
          messenger.sendImageMessage(senderID, 'https://68.media.tumblr.com/69a5c69c36489d90d9838850f5668af6/tumblr_ou0embggVR1ssnf1qo6_250.gif');
        });
      } else {
        messenger.sendTextMessage(senderID, response.result.fulfillment.speech);
      }
    }
  });
  request.on('error', (error) => {
    console.log(error);
  });
  request.end();
}
