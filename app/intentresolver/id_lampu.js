const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://45.32.115.11');


const idLampuFulfilment = (profile, data, response) => {
  let action = '';
  if (response.entities.on_off[0].value === 'on') {
    client.publish('lampu', 'on');
    action = 'nyalakan';
  } else {
    client.publish('lampu', 'off');
    action = 'matikan';
  }
  const device = response.entities.iot_things[0].value;
  const place = response.entities.iot_place[0].value;
  const returnSpeech = `${profile.first_name}, ${device} ${place} sudah aku ${action}`;
  return returnSpeech;
};

module.exports = idLampuFulfilment;
