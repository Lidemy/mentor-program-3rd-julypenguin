// Deque，前後 2 端都可以插入元素，也可以從前後 2 端移除元素
class Deque {
  pushFront(val) {
    if (!this.arr) {
      this.arr = [val];
    } else {
      this.arr = [val, ...this.arr];
    }
  }

  pushBack(val) {
    if (!this.arr) {
      this.arr = [val];
    } else {
      this.arr = [...this.arr, val];
    }
  }

  popFront() {
    const [popItem] = this.arr.splice(0, 1);
    return popItem;
  }

  popBack() {
    const [popItem] = this.arr.splice((this.arr.length - 1), 1);
    return popItem;
  }
}


// Priority Queue，每個元素都有優先級，越優先排越前面，優先級相同就看排列順序
class PriorityQueue {
  push(element, priority) {
    let idx = 0;

    if (!this.arr) {
      this.arr = [{ element, priority }];
      return;
    }

    this.arr.forEach((item, index) => {
      if (item.priority > priority) {
        idx = idx || index + 1;
      }
    });

    if (idx) {
      this.arr.splice(idx - 1, 0, { element, priority });
    } else {
      this.arr = [...this.arr, { element, priority }];
    }
  }

  pop() {
    const [popItem] = this.arr.splice(0, 1);
    return popItem;
  }
}

const deque = new Deque();
deque.pushFront(1);
deque.pushFront(2);
deque.pushBack(3);
console.log(deque.popFront()); // 2
console.log(deque.popBack()); // 3
console.log(deque.popBack()); // 1

const pq = new PriorityQueue();
pq.push('b', 2);
pq.push('c', 3);
pq.push('a', 1);
pq.push('d', 4);
console.log(pq.pop()); // { element: "a", priority: 1}
console.log(pq.pop()); // { element: "b", priority: 2}
console.log(pq.pop()); // { element: "c", priority: 3}
console.log(pq.pop()); // { element: "d", priority: 4}
