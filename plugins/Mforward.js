const Bixbymowl = require("../Utilis/events");
const { forwardOrBroadCast } = require("../Utilis/groupmute");
const { getBuffer } = require('../Utilis/download');
const { parsedJid } = require("../Utilis/Misc");

// chnage url for custom photo and change caption if
const url = 'https://www.linkpicture.com/q/20211204_114453.jpg'
Bixbymowl.addCommand(
    { pattern: 'mforward ?(.*)', fromMe: true, desc: "Forward replied msg." },
    async (message, match) => {
        if (match == "") return await message.sendMessage("*Give me a jid*\nExample .mforward jid1 jid2 jid3 jid4 ...");
        if (!message.reply_message)
            return await message.sendMessage("*Reply to a Message*");
        const buff = await getBuffer(url)
        let options = {}
        /* delete this line for forwarded tag
        options.contextInfo = {
                 forwardingScore: 5, // change it to 999 for many times forwarded
                 isForwarded: true 
              } 
           delete this line for forwarded tag*/

        /* delete this line for audio seconds change
        options.duration = 999999 
       delete this line for custom audio seconds */

        options.ptt = true // delete this if not need audio as voice always
        options.quoted = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                "imageMessage": {
                    "jpegThumbnail": buff.buffer,
                    "caption": "Bixby-mowl"
                }
            }
        }
        for (let jid of parsedJid(match)) {
      await forwardOrBroadCast(jid, message, options);
    }
    }
);
