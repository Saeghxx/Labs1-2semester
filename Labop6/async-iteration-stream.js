const fs = require("fs");

const main = async (inputFilePath, signal) => {
  const readStream = fs.createReadStream(inputFilePath, {
    encoding: "utf8",
    highWaterMark: 256,
  });

  let closed = false;

  const cleanup = () => {
    if (closed) return;
    closed = true;
    readStream.destroy();
  };

  const abortHandler = () => {
    cleanup();
  };

  signal?.addEventListener("abort", abortHandler);
 
};
