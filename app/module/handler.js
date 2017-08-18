const config = require('config');
const franc = require('franc');

// Generate a page access token for your page from the App Dashboard
const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
(process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
config.get('pageAccessToken');

let FBMessenger = require('fb-messenger');
let messenger = new FBMessenger(PAGE_ACCESS_TOKEN);

export const handler = (data) => {
    let senderID = data.sender.id;
    let pageID = data.recipient.id;
    let timeOfMessage = data.timestamp;
    let message = data.message;
    let userProfile = "";

    let readableMessage = message.text;    
    let lang = franc(readableMessage, {blacklist: ['src', 'zlm'], minLength: 3});
    
    console.log("[receivedMessage] user (%d) page (%d) timestamp (%d) and message (%s)", 
    senderID, pageID, timeOfMessage, JSON.stringify(message));

    if(lang == "eng") {
        messenger.sendTextMessage(senderID, 'English');
        
    } else if (lang == "ind") {
        messenger.getProfile(senderID, function (err, body) {
            userProfile = body;
            messenger.sendTextMessage(senderID, `Maaf ${userProfile.first_name}, bahasa indonesia ku belum bagus`);
            
        });
        
    }
}

export default handler;
