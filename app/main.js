/*
 * Copyright 2017-present, Facebook, Inc.
 * 
 * Agastya Darma Laksana
 * 
 * 
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
"use strict";
import handler from './module/handler';

export const processor = (req, res) => {
    let data = req.body;
    // Make sure this is a page subscription
    if (data.object == 'page') {
        // entries may be batched so iterate over each one
        data.entry.forEach(function(pageEntry) {
            var pageID = pageEntry.id;
            var timeOfEvent = pageEntry.time;
    
            // iterate over each messaging event
            pageEntry.messaging.forEach(function(messagingEvent) {
    
            let propertyNames = [];
            for (var prop in messagingEvent) { propertyNames.push(prop)}
            console.log("[app.post] Webhook received a messagingEvent with properties: ", propertyNames.join());
            
            if (messagingEvent.message) {
                // someone sent a message
                handler(messagingEvent);
    
            } else {
                console.log("[app.post] Webhook is not prepared to handle this message.");
            }
            });
        });
    
        // Assume all went well.
        //
        // You must send back a 200, within 20 seconds, to let us know you've 
        // successfully received the callback. Otherwise, the request will time out.
        res.sendStatus(200);

    }
};

export default processor;
