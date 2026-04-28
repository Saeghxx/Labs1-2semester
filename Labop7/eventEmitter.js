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

 emit(event, data) {
  const listeners = this.subscribers[event];
  if (!listeners || listeners.length === 0) return;

  for (const listener of listeners) {
    try {
      listener(data);
     } catch (err) {
      this.emitError(err);
    }
  }
}

 emitError(error) {
   const errorListeners = this.subscribers["error"];

   if (errorListeners && errorListeners.length > 0) {
     for (const listener of errorListeners) {
       try {
         listener(error);
       } catch (e) {
        console.error("Error listener failed:", e);
       }
      }
    } else {
     console.error("Unhandled emitter error:", error);
    }
  } 
}