const moment = require("moment-timezone");
moment.tz.setDefault("America/Sao_Paulo").locale("pt-br");


async function audioSextou(client, args, message){
    let { pushname, verifiedName } = message.sender;
    pushname = pushname || verifiedName;
    if (moment().format("dddd") == "sexta-feira") {
        await client.reply(message.from, "bora meu patrão", message.id);
      } else {
        await client.reply(
          message.from,
          `Calma calma calma ${pushname} ainda é ${moment().format(
            "dddd"
          )} e você já ta procurando sexta-feira?....`,
          message.id
        );
      }
}

module.exports = audioSextou;