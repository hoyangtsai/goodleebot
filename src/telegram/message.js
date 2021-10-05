const { getSticker } = require('../utils/sticker.js');

module.exports = async function (context) {
  if (context.event.isText) {
    const { text } = context.event;
    console.log('telegram text:\n', text);

    const stickerMeta = await getSticker(text);
    const { name = '', downloadLink = '' } = stickerMeta;
    if (name && downloadLink) {
      await context.sendText(`${name}\nDownload: ${downloadLink}`, {
        parseMode: 'markdown',
      });
    }
  }
};
