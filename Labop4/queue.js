// Lab 4
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

  enqueue(value, priority) {
    this.data.push(new QueueItem(value, priority, this.orderCounter++));
  }

  _bestIndex(type) {
    if (this.data.length === 0) {
      throw new Error("Queue is empty");
    }

    let best = 0;

    for (let i = 1; i < this.data.length; i++) {
      const a = this.data[i];
      const b = this.data[best];

      const higher =
        a.priority > b.priority ||
        (a.priority === b.priority && a.order < b.order);

      const lower =
        a.priority < b.priority ||
        (a.priority === b.priority && a.order < b.order);

      if (type === "highest" && higher) best = i;
      if (type === "lowest" && lower) best = i;
    }

    return best;
  }

  _edge(type) {
    return type === "oldest" ? 0 : this.data.length - 1;
  }

  peek(mode) {
    const idx =
      mode === "highest" || mode === "lowest"
        ? this._bestIndex(mode)
        : this._edge(mode);

    return this.data[idx].value;
  }

  dequeue(mode) {
    const idx =
      mode === "highest" || mode === "lowest"
        ? this._bestIndex(mode)
        : this._edge(mode);

    return this.data.splice(idx, 1)[0].value;
  }
}

module.exports = BiPriorityQueue;