class Stack {
  push(val) {
    if (!this.arr) {
      this.arr = [val];
    } else {
      this.arr = [...this.arr, val];
    }
  }

  pop() {
    const [popItem] = this.arr.splice((this.arr.length - 1), 1);
    return popItem;
  }
}

class Queue {
  push(val) {
    if (!this.arr) {
      this.arr = [val];
    } else {
      this.arr = [...this.arr, val];
    }
  }

  pop() {
    const [popItem] = this.arr.splice(0, 1);
    return popItem;
  }
}


const stack = new Stack();
stack.push(10);
stack.push(5);
console.log(stack.pop()); // 5
console.log(stack.pop()); // 10

const queue = new Queue();
queue.push(1);
queue.push(2);
console.log(queue.pop()); // 1
console.log(queue.pop()); // 2
