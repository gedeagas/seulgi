const faker = require('faker');

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

const orderFulfilment = (profile, data, response) => {
  let pricing = 0;
  const todayTimestamp = Math.floor(new Date() / 1000);
  const orderTimespan = response.result.contexts[1].parameters.timespan;

  if (orderTimespan === 'daily') {
    pricing = 200000;
  } if (orderTimespan === 'weekly') {
    pricing = 1000000;
  } else {
    pricing = 2600000;
  }

  const resep = {
    recipient_name: `${profile.first_name} ${profile.last_name}`,
    merchant_name: 'Kumpul Coworking Space',
    order_number: faker.finance.bitcoinAddress(),
    currency: 'IDR',
    payment_method: 'Website',
    order_url: 'https://www.kumpul.co/membership/join/',
    timestamp: todayTimestamp,
    address: {
      street_1: 'Rumah Sanur, Jl. Danau Poso 51A Br. Semawang',
      street_2: '',
      city: 'Sanur',
      postal_code: '80228',
      state: 'Bali',
      country: 'Indonesia',
    },
    summary: {
      subtotal: pricing,
      total_tax: 0,
      total_cost: pricing,
    },
    elements: [
      {
        title: `${capitalizeFirstLetter(orderTimespan)} Coworking Membership`,
        subtitle: 'Welcome to Kumpul Coworking Space',
        quantity: 1,
        price: pricing,
        currency: 'IDR',
        image_url: 'https://www.kumpul.co/images/beanbags.jpg',
      },
    ],
  };

  return resep;
};

module.exports = orderFulfilment;
