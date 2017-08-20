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
      if (response.result.metadata.intentName === 'smalltalk.agent.beautiful') {
        messenger.getProfile(senderID, (err, body) => {
          const userProfile = body;
          const speech = response.result.fulfillment.speech;
          const resep = {
            recipient_name: 'Stephane Crozatier',
            order_number: '12345678902',
            currency: 'USD',
            payment_method: 'Visa 2345',
            order_url: 'http://petersapparel.parseapp.com/order?order_id=123456',
            timestamp: '1428444852',
            address: {
              street_1: '1 Hacker Way',
              street_2: '',
              city: 'Menlo Park',
              postal_code: '94025',
              state: 'CA',
              country: 'US',
            },
            summary: {
              subtotal: 75.00,
              shipping_cost: 4.95,
              total_tax: 6.19,
              total_cost: 56.14,
            },
            adjustments: [
              {
                name: 'New Customer Discount',
                amount: 20,
              },
              {
                name: '$10 Off Coupon',
                amount: 10,
              },
            ],
            elements: [
              {
                title: 'Classic White T-Shirt',
                subtitle: '100% Soft and Luxurious Cotton',
                quantity: 2,
                price: 50,
                currency: 'USD',
                image_url: 'http://petersapparel.parseapp.com/img/whiteshirt.png',
              },
              {
                title: 'Classic Gray T-Shirt',
                subtitle: '100% Soft and Luxurious Cotton',
                quantity: 1,
                price: 25,
                currency: 'USD',
                image_url: 'http://petersapparel.parseapp.com/img/grayshirt.png',
              },
            ],
          };
          messenger.sendTextMessage(senderID, `${speech} ${userProfile.first_name}`);
          messenger.sendImageMessage(senderID, 'https://68.media.tumblr.com/69a5c69c36489d90d9838850f5668af6/tumblr_ou0embggVR1ssnf1qo6_250.gif');
          messenger.sendReceiptMessage(senderID, resep);
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
