//Lab 6 
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
 
  try {
    for await (const chunk of readStream) {
      if (signal?.aborted) break;

      console.log(`>>> ${chunk}`);
    }

    console.log("DONE");
  } catch (err) {
    cleanup();
    throw err;
  } finally {
    signal?.removeEventListener("abort", abortHandler);
    cleanup();
  }
};

const controller = new AbortController();

main("./mock-data.txt", controller.signal);