/*
 * Copyright 2017-present, Facebook, Inc.
 * 
 * Agastya Darma Laksana
 * agastyadarma@fb.com
 * 
 * 
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* jshint node: true, devel: true */
'use strict';

const 
bodyParser = require('body-parser'),
config = require('config'),
crypto = require('crypto'),
express = require('express'),
https = require('https'),  
request = require('request');

//importing dependency 
import main from './app/main';
import verifyRequestSignature from './app/service/verifyRequestSignature';

let app = express();
app.set('port', process.env.PORT || 1263);
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: verifyRequestSignature }));
app.use(express.static('public'));


/*
 * Open config/default.json and set your config values before running this code. 
 * You can also set them using environment variables.
 *
 */

// App Secret can be retrieved from the App Dashboard
const APP_SECRET = (process.env.MESSENGER_APP_SECRET) ? 
process.env.MESSENGER_APP_SECRET :
config.get('appSecret');

// Arbitrary value used to validate a webhook
const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN) ?
(process.env.MESSENGER_VALIDATION_TOKEN) :
config.get('validationToken');

// Generate a page access token for your page from the App Dashboard
const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
(process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
config.get('pageAccessToken');

// making sure that everything has been properly configured
if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN)) {
    console.error("Missing config values");
    process.exit(1);
}

/*
 * This function is only for webhook verification
 * Use your own validation token. Check that the token used in the Webhook 
 * setup is the same token used here.
 *
 */

app.get('/webhook', function(req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === VALIDATION_TOKEN) {
      console.log("[app.get] Validating webhook");
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error("Failed validation. Make sure the validation tokens match.");
      res.sendStatus(403);          
    }  
});


/*
*
* All facebook messenger incoming chat will be handled here
*
*/
app.post('/webhook', main.processor);