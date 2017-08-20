const apiai = require('apiai');
const app = apiai('73f11a6d692146bdb9708b4e434e7ec9');

const request = app.textRequest('who are you', {
    sessionId: '1283uhakjnsdkj',
  });

  request.on('response', (response) => {
    console.log(response);
  });

  request.on('error', (error) => {
    console.log(error);
  });

  request.end();