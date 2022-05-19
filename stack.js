class StackNode {
  #previous;
  #value;

  constructor(value) {
    this.#value = value;
    this.#previous = null;
  }

  getPrevious() {
    return this.#previous;
  }

  setPrevious(previous) {
    this.#previous = previous;
  }

  getValue() {
    return this.#value;
  }
}

class Stack {
  #maxLength;
  #length;
  #last;

  constructor(maxLength = 10) {
    if (typeof maxLength !== 'number' || !isFinite(maxLength)) {
      throw new TypeError('Max length must by type of number');
    }

    this.#maxLength = maxLength;
    this.#length = 0;
    this.#last = null;
  }

  push(elem) {
    if (this.#length === this.#maxLength) {
      throw new Error('Stack is full');
    }

    const newNode = new StackNode(elem);

    if (this.#last) {
      newNode.setPrevious(this.#last);
    }

    this.#last = newNode;
    this.#length++;
  }

  pop() {
    if (this.#length === 0) {
      throw new Error('Stack is empty');
    }

    const result = this.#last;

    this.#last = result.getPrevious();
    this.#length--;

    return result.getValue();
  }

  peek() {
    return this.#last.getValue();
  }

  isEmpty() {
    return this.#length === 0;
  }

  toArray() {
    const result = [];
    let current = this.#last;

    while (current) {
      result.unshift(current.getValue());

      current = current.getPrevious();
    }

    return result;
  }

  static fromIterable(iterable) {
    const isIterable = iterable && typeof iterable[Symbol.iterator] === 'function';

    if (!isIterable) {
      throw new TypeError('Parameter is not an iterable object');
    }

    const arr = Array.from(iterable);
    const stack = new Stack(arr.length);

    arr.forEach((elem) => stack.push(elem));

    return stack;
  }
}

module.exports = { Stack };
