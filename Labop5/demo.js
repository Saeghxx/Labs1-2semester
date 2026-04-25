const { filterCallback } = require('./filter.js');
const { filterPromise } = require('./filter.js');

const hetmans = [
  { name: "Bohdan Khmelnytsky", power: 95 },
  { name: "Ivan Mazepa", power: 88 },
  { name: "Petro Doroshenko", power: 72 },
  { name: "Pavlo Teteria", power: 55 },
  { name: "Ivan Vyhovsky", power: 80 }
];

const strongHetmanCallback = (item, cb) => {
  setTimeout(() => {
    cb(null, item.power >= 80);
  }, 60);
};

const strongHetmanPromise = async (item) => {
  await sleep(50);
  return item.power >= 80;
};

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

(async () => {
  try {
    const result = await filterPromise(
      hetmans,
      strongHetmanPromise,
      controller2.signal
    );

    console.log(
      "Elite Hetmans:",
      result.map((h) => h.name)
    );
  } catch (e) {
    console.log("Error:", e.message);
  }
})();

console.log("\nABORT DEMO");

const controller3 = new AbortController();

filterPromise(
  hetmans,
  strongHetmanPromise,
  controller3.signal
)
  .then((result) => {
    console.log(
      "Result:",
      result.map((h) => h.name)
    );
  })
  .catch((err) => {
    console.log("Aborted:", err.message);
  });

setTimeout(() => {
  controller3.abort();
}, 80);