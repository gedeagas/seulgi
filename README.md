# S.E.U.L.G.I
S.E.U.L.G.I Backend Chatbot untuk Facebook Masterclass for Devs

## Pre-requisites

1. NodeJS (latest is better)
2. [ngrok](https://ngrok.com/)

## How to use

1. Run `npm install` if you use `npm` or run `yarn install` if you use `yarn`
2. Rename / copy `.env.example` file to `.env` and edit the following item based on your config
```
MESSENGER_APP_SECRET=YOUR_APP_SECRET <- can be found on your FB developer account
MESSENGER_PAGE_ACCESS_TOKEN=YOUR_PAGE_ACCESS_TOKEN <- can be found on your FB developer account
MESSENGER_VALIDATION_TOKEN=YOUR_VERY_SECRET_VALIDATION_TOKEN <- your validation token (it can be char, but no space please)
```
3. Run your `ngrok`. Please see their [docs](https://ngrok.com/docs)
5. Go to your FB developer account page
4. Copy the `https` endpoint and paste it on the messenger webhook on there. Please note that if you're already had the webhook set up, you can update the webhook endpoint on the **Webhooks** sub menu under **Product** menu on sidebar.
5. Set your **Verify Token**. This token must match with the `MESSENGER_VALIDATION_TOKEN` on step number 2.
