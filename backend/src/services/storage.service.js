const ImageKit = require("@imagekit/nodejs");
const streamifier = require("streamifier");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, fileName) {
  console.log("Uploading file size:", file.buffer.length);

  const stream = streamifier.createReadStream(file.buffer);

  const result = await imagekit.files.upload({
    file: stream,
    fileName: fileName || file.originalname
  });

  return result;
}

module.exports = {
  uploadFile
};
