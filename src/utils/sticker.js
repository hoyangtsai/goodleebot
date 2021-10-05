const axios = require('axios');

function StickerMeta() {
  this.name = '';
  this.cover = '';
  this.downloadLink = '';
}

exports.getSticker = async function (url) {
  const host = 'https://stickershop.line-scdn.net/stickershop/v1/product/';

  const productInfo = '/LINEStorePC/productinfo.meta';
  const coverPath = '/LINEStorePC/main.png';

  const animateSticker = 'stickerpack@2x.zip';
  const sticker = 'stickers@2x.zip';

  const regex = /https?.+line.me.+\b(\d+)/g;
  const matches = regex.exec(url);
  const stickerId = matches && Number(matches[1]);

  let lineSticker = new StickerMeta();

  if (stickerId) {
    lineSticker.cover = `${host}${stickerId}${coverPath}`;

    const res = await axios.get(`${host}${stickerId}${productInfo}`);
    if (res.status == 200) {
      const info = res.data;
      console.log('res data:\n', info);
      const namezht = info.title['zh_TW'];
      console.log('namezht:\n', namezht);

      let downloadLink = `${host}${stickerId}/iphone/`;
      if (info.hasAnimation) {
        downloadLink += animateSticker;
      } else {
        downloadLink += sticker;
      }

      lineSticker.name = namezht;
      lineSticker.downloadLink = downloadLink;
    }
  }

  return lineSticker;
};
