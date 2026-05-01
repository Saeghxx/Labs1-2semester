const EventEmitter = require('./eventEmitter');

const emitter = new EventEmitter();

const paymentListener = data => {
  console.log("Payment processed:", data);
};

const invoiceListener = data => {
  console.log("Invoice created for:", data);
};

const brokenPaymentListener = data => {
  throw new Error("Payment gateway timeout!");
};

const analyticsListener = data => {
  console.log("Analytics updated:", data);
};

const errorHandler = err => {
  console.log("Payment system error:", err.message);
};

emitter.subscribe("paymentSuccess", paymentListener);
emitter.subscribe("paymentSuccess", invoiceListener);
emitter.subscribe("paymentSuccess", brokenPaymentListener);
emitter.subscribe("paymentSuccess", analyticsListener);

emitter.subscribe("error", errorHandler);

console.log("PAYMENT EVENT");
emitter.emit("paymentSuccess", "$777 paid by customer");

emitter.unsubscribe("paymentSuccess", brokenPaymentListener);

console.log("SECOND PAYMENT");
emitter.emit("paymentSuccess", "$999 paid by customer");