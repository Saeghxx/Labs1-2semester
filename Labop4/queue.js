class QueueItem {
  constructor(value, priority, order) {
    this.value = value;
    this.priority = priority;
    this.order = order;
  }
}

class BiPriorityQueue {
  constructor() {
    this.data = [];
    this.orderCounter = 0;
  }
}