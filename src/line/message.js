const { getSticker } = require('../utils/sticker.js');

module.exports = async function (context) {
  if (context.event.isText) {
    const { text } = context.event;
    console.log('line text:\n', text);

    const stickerMeta = await getSticker(text);
    console.log('stickerMeta:\n', stickerMeta);

    const { name = '', downloadLink = '' } = stickerMeta;
    if (name && downloadLink) {
      await context.sendText(`${name}\nDownload: ${downloadLink}`);

      // await context.sendFlex('Sticker Info', {
      //   type: 'bubble',
      //   hero: {
      //     type: 'image',
      //     url: stickerMeta.cover || '',
      //     size: 'full',
      //     aspectRatio: '4:3',
      //   },
      //   body: {
      //     type: 'box',
      //     layout: 'vertical',
      //     contents: [
      //       {
      //         type: 'text',
      //         text: name,
      //         weight: 'bold',
      //         size: 'lg',
      //       },
      //     ],
      //   },
      //   footer: {
      //     type: 'box',
      //     layout: 'vertical',
      //     contents: [
      //       {
      //         type: 'button',
      //         style: 'primary',
      //         action: {
      //           type: 'uri',
      //           label: 'Download',
      //           uri: downloadLink,
      //         },
      //       },
      //     ],
      //   },
      // });
    }
  }
};
