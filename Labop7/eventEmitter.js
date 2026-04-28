class EventEmitter {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
  if (!this.subscribers[event]) {
    this.subscribers[event] = [];
  }
  this.subscribers[event].push(callback);
}

unsubscribe(event, callback) {
  if (!this.subscribers[event]) return;

  this.subscribers[event] = this.subscribers[event].filter(
    sub => sub !== callback
  );
 }
}