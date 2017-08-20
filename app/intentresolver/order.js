const faker = require('faker');

export const orderFulfilment = (profile, data, response) => {
  const todayTimestamp = Math.floor(new Date() / 1000);
  let pricing = 0;
  const orderTimespan = response.result.contexts[1].parameters.timespan;
  if (orderTimespan === 'daily') {
    pricing = 200000;
  } else {
    pricing = 2600000;
  }

  const resep = {
    recipient_name: profile.first_name,
    order_number: faker.finance.bitcoinAddress(),
    currency: 'IDR',
    payment_method: 'Website',
    order_url: 'https://www.kumpul.co/membership/join/',
    timestamp: todayTimestamp,
    address: {
      street_1: 'Rumah Sanur',
      street_2: 'Jl. Danau Poso 51A Br. Semawang',
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
        title: `${orderTimespan} Coworking Membership`,
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

export default orderFulfilment;
