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
import { APP_SECRET } from '../module/token';

const crypto = require('crypto');

export default function verifyRequestSignature(req, res, buf) {
  const signature = req.headers['x-hub-signature'];

  if (!signature) {
    // In DEV, log an error. In PROD, throw an error.
    console.error("Couldn't validate the signature.");
  } else {
    const elements = signature.split('=');
    const method = elements[0];
    const signatureHash = elements[1];

    const expectedHash = crypto.createHmac('sha1', APP_SECRET)
      .update(buf)
      .digest('hex');

    if (signatureHash !== expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}
