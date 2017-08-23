import engineEngilish from './engineEnglish';
import engineIndonesian from './engineIndonesian';

const franc = require('franc');

export const handlerEngine = (data) => {
  const senderID = data.sender.id;
  const pageID = data.recipient.id;
  const timeOfMessage = data.timestamp;
  const message = data.message;

  const readableMessage = message.text;
  const lang = franc(readableMessage, { minLength: 3, whitelist: ['eng', 'ind'] });

  console.log('[receivedMessage] user (%d) page (%d) timestamp (%d) and message (%s)',
    senderID, pageID, timeOfMessage, JSON.stringify(message));

  if (lang === 'eng') {
    engineEngilish(data);
  } else if (lang === 'ind') {
    engineIndonesian(data);
  }
};

export default handlerEngine;
