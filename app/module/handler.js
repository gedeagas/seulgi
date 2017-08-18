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
    let senderName = "";

    let lang = franc(message, {blacklist: ['src', 'zlm']});
    
    console.log("[receivedMessage] user (%d) page (%d) timestamp (%d) and message (%s)", 
    senderID, pageID, timeOfMessage, JSON.stringify(message));
    
    

    messenger.getProfile(senderID, function (err, body) {
        if(err) return console.error(err)
        console.log(body)
    });

    if(lang == "eng") {
        messenger.sendTextMessage(senderID, 'English');
        
    } else {
        messenger.sendTextMessage(senderID, 'Maaf , bahasa indonesia ku belum bagus');
        
    }
}

export default handler;
