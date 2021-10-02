const axios = require('axios');

module.exports = async function (context) {
  if (context.event.isText) {
    const { text } = context.event;

    const host = 'https://stickershop.line-scdn.net/stickershop/v1/product/';
    const productInfo = '/linestorepc/productinfo.meta';

    const regex = /https?.+line.me.+\b(\d+)/g;
    const matches = regex.exec(text);
    const stickerId = matches && Number(matches[1]);

    if (Number.isInteger(stickerId)) {
      const res = await axios.get(`${host}${stickerId}${productInfo}`);
      if (res.status == 200) {
        const info = res.data;
        const name = info.title['zh_TW'];

        let downloadLink = `${host}${stickerId}/iphone/`;
        if (info.hasAnimation) {
          downloadLink += 'stickerpack@2x.zip';
        } else {
          downloadLink += 'stickers@2x.zip';
        }

        await context.sendText(`Download: [${name}](${downloadLink})`, {
          parseMode: 'markdown',
        });
      }
    }
  }
};
