const { filterCallback, filterPromise, sleep } = require("./filter.js");

const hetmans = [
  { name: "Bohdan Khmelnytsky", power: 95 },
  { name: "Ivan Mazepa", power: 88 },
  { name: "Petro Doroshenko", power: 72 },
  { name: "Pavlo Teteria", power: 55 },
  { name: "Ivan Vyhovsky", power: 80 }
];

function strongHetmanCallback(item, cb) {
  setTimeout(() => {
    cb(null, item.power >= 80);
  }, 60);
}

async function strongHetmanPromise(item) {
  await sleep(50);
  return item.power >= 80;
}

console.log("\nCALLBACK DEMO");

const controller1 = new AbortController();

filterCallback(
  hetmans,
  strongHetmanCallback,
  (err, result) => {
    if (err) {
      console.log("Error:", err.message);
    } else {
      console.log(
        "Strong Hetmans:",
        result.map((h) => h.name)
      );
    }
  },
  controller1.signal
);

console.log("\nPROMISE DEMO");

const controller2 = new AbortController();

filterPromise(
  hetmans,
  strongHetmanPromise,
  controller2.signal
)
  .then((result) => {
    console.log(
      "Promise Result:",
      result.map((h) => h.name)
    );
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });

console.log("\nASYNC DEMO");

const controller3 = new AbortController();

(async () => {
  try {
    const result = await filterPromise(
      hetmans,
      strongHetmanPromise,
      controller3.signal
    );

    console.log(
      "Async Result:",
      result.map((h) => h.name)
    );
  } catch (err) {
    console.log("Error:", err.message);
  }
})();

console.log("\nABORT DEMO");

const controller4 = new AbortController();

filterPromise(
  hetmans,
  strongHetmanPromise,
  controller4.signal
)
  .then((result) => {
    console.log(
      "Abort Result:",
      result.map((h) => h.name)
    );
  })
  .catch((err) => {
    console.log("Aborted:", err.message);
  });

setTimeout(() => {
  console.log("ABORT TRIGGERED");
  controller4.abort();
}, 10);