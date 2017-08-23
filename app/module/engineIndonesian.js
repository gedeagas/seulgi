import { PAGE_ACCESS_TOKEN } from './token';
import lampuResolver from '../intentresolver/id_lampu';

const { Wit, log } = require('node-wit');
const FBMessenger = require('fb-messenger');

const messenger = new FBMessenger(PAGE_ACCESS_TOKEN);
const client = new Wit({
  accessToken: 'KINKEGM5DMVSRA2LHAIYGFIVR72LC7X7',
  logger: new log.Logger(log.DEBUG), // optional
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
// console.log(client.message('nyalakan lampu kamar mandi'));
export default function engineIndonesian(data) {
  const senderID = data.sender.id;
  const message = data.message.text;

  client.message(message)
    .then((intentData) => {
      if (isDefined(intentData.entities.iot_things) && isDefined(intentData.entities.iot_place) && isDefined(intentData.entities.on_off)) {
        messenger.getProfile(senderID, (err, body) => {
          const userProfile = body;
          messenger.sendTextMessage(senderID, lampuResolver(userProfile, data, intentData));
        });
      }
    });
}
