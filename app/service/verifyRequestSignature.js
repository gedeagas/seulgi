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
const crypto = require('crypto');
const config = require('config');

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

export default function verifyRequestSignature(req, res, buf) {
    var signature = req.headers["x-hub-signature"];
  
    if (!signature) {
      // In DEV, log an error. In PROD, throw an error.
      console.error("Couldn't validate the signature.");
    } else {
      var elements = signature.split('=');
      var method = elements[0];
      var signatureHash = elements[1];
  
      var expectedHash = crypto.createHmac('sha1', APP_SECRET)
                          .update(buf)
                          .digest('hex');
  
      if (signatureHash != expectedHash) {
        throw new Error("Couldn't validate the request signature.");
      }
    }
  }