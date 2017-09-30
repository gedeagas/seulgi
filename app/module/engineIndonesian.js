const { Wit, log } = require('node-wit');
const FBMessenger = require('fb-messenger');

const { PAGE_ACCESS_TOKEN } = require('./token');
const lampuResolver = require('../intentresolver/id_lampu');

const messenger = new FBMessenger(PAGE_ACCESS_TOKEN);
const client = new Wit({
  accessToken: 'JSJM5RRE3BPEDNKZDZMKAU4ZYMNJTN4Z',
  logger: new log.Logger(log.DEBUG), // optional
});

const isDefined = (obj) => {
  if (typeof obj === 'undefined') {
    return false;
  }

  if (!obj) {
    return false;
  }

  return obj != null;
};

const engineIndonesian = (data) => {
  const senderID = data.sender.id;
  const message = data.message.text;

  client.message(message)
    .then((intentData) => {
      if (isDefined(intentData.entities.iot_things) &&
        isDefined(intentData.entities.iot_place) &&
        isDefined(intentData.entities.on_off)
      ) {
        messenger.getProfile(senderID, (err, body) => {
          const userProfile = body;
          messenger.sendTextMessage(senderID, lampuResolver(userProfile, data, intentData));
        });
      }

      if (isDefined(intentData.entities.intent) && intentData.entities.intent[0].value === 'order') {
        if (!isDefined(intentData.entities.location_to) &&
          !isDefined(intentData.entities.location_from)
        ) {
          messenger.sendTextMessage(senderID, 'dari mana mau kemana bos?');
        }

        if (!isDefined(intentData.entities.location_to) &&
          isDefined(intentData.entities.location_from)
        ) {
          messenger.sendTextMessage(senderID, 'darimana ya?');
        }

        if (isDefined(intentData.entities.location_to) &&
          !isDefined(intentData.entities.location_from)
        ) {
          messenger.sendTextMessage(senderID, 'mau kemana ya?');
        }

        if (isDefined(intentData.entities.location_to) &&
          isDefined(intentData.entities.location_from)
        ) {
          messenger.sendButtonsMessage(senderID, 'OK! Klik tombol di bawah untuk melanjutkan ya bos', [
            {
              type: 'web_url',
              url: 'http://localhost:3000',
              title: 'Checkout',
            },
          ]);
        }
      }
    });
};

module.exports = engineIndonesian;
