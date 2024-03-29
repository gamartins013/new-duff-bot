const { decryptMedia } = require("@open-wa/wa-decrypt");
const fs = require("fs-extra");
async function sticker(client, args, message) {
  try {
    const botName = "Duff-Bot";
    const isQuotedImage =
      message.quotedMsg && message.quotedMsg.type == "image";
    const isQuotedVideo =
      message.quotedMsg && message.quotedMsg.type == "video";
    const uaOverride =
      "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";

    if (message.isMedia || isQuotedImage || isQuotedVideo) {
      client.reply(message.from, "ovo fazer a figurinha...", message.id);

      var encryptMedia =
        isQuotedImage || isQuotedVideo ? message.quotedMsg : message;
      var _mimetype =
        isQuotedImage || isQuotedVideo
          ? message.quotedMsg.mimetype
          : message.mimetype;
      var mediaData = await decryptMedia(encryptMedia, uaOverride);

      const armazenar = _mimetype.split("/");
      const fileName = `${armazenar[0]}_${Date.now()}.${armazenar[1]}`;

      //salvar media
      fs.writeFile(`./logs/medias/${fileName}`, mediaData);

      let armazenados = "";
      // verifica se o arquivo existe
      if (fs.existsSync(`./logs/messages/${message.from}`)) {
        armazenados = fs.readFileSync(`./logs/messages/${message.from}`);
      }

      fs.writeFile(
        `./logs/messages/${message.from}`,
        `${armazenados}` +
          `
  Id: ${message.chat.id}
  Media: ${fileName}
  `
      ).then(() => console.log("Arquivo salvo com sucesso!"));

      if (_mimetype === "video/mp4" || _mimetype === "image/gif") {
        if (encryptMedia.duration < 30) {
          var imageBase64 = `data:${_mimetype};base64,${mediaData.toString(
            "base64"
          )}`;
          await client
            .sendMp4AsSticker(message.from, imageBase64, null, {
              stickerMetadata: true,
              author: botName,
              pack: "PackDo" + botName,
              fps: 10,
              square: "512",
              loop: 0,
            })
            .then(() => {
              client.reply(
                message.from,
                "Pega aqui sua figurinha!",
                message.id
              );
            })
            .catch((err) => {
              console.log(err);
              client.reply(
                message.from,
                "Desculpe, o arquivo é muito grande!",
                message.id
              );
            });
        } else {
          await client.reply(
            message.from,
            "Pô cara, tu tem que me mandar algo ai de no máximo 30 segundos!",
            message.id
          );
        }
      } else {
        var imageBase64 = `data:${_mimetype};base64,${mediaData.toString(
          "base64"
        )}`;
        await client
          .sendImageAsSticker(message.from, imageBase64, {
            author: "Duff-Bot",
            pack: "Pack do Duff",
            keepScale: true,
          })
          .then(() => {
            client.reply(message.from, "Pega aqui sua figurinha!", message.id);
          })
          .catch((err) => {
            console.log(err);
            client.reply(
              message.from,
              "Desculpe, o arquivo é muito grande!",
              message.id
            );
          });
      }
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = sticker;
