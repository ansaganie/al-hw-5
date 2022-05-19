class LinkedNode {
  #value;
  #next;

  constructor(value) {
    this.#value = value;
    this.#next = null;
  }

  setNext(next) {
    this.#next = next;
  }

  getNext() {
    return this.#next;
  }

  hasNext() {
    return Boolean(this.#next);
  }

  getValue() {
    return this.#value;
  }
}

class LinkedList {
  #head = null;

  append(elem) {
    const newNode = new LinkedNode(elem);

    if (this.#head) {
      let current = this.#head;

      while (current.hasNext()) {
        current = current.getNext();
      }

      current.setNext(newNode);
    } else {
      this.#head = newNode;
    }
  }

  prepend(elem) {
    const newNode = new LinkedNode(elem);

    if (this.#head) {
      newNode.setNext(this.#head);

      this.#head = newNode;
    } else {
      this.#head = newNode;
    }
  }

  find(elem) {
    let result = null;
    let current = this.#head;

    while (current) {
      if (current.getValue() === elem) {
        result = current.getValue();

        break;
      }

      current = current.getNext();
    }

    return result;
  }

  toArray() {
    const result = [];

    let current = this.#head;

    while (current) {
      result.push(current.getValue());

      current = current.getNext();
    }

    return result;
  }

  static fromIterable(iterable) {
    const isIterable = iterable && typeof iterable[Symbol.iterator] === 'function';

    if (!isIterable) {
      throw new TypeError('Parameter is not an iterable object');
    }

    const linkedList = new LinkedList();

    for (const item of iterable) {
      linkedList.append(item);
    }

    return linkedList;
  }
}

module.exports = { LinkedList };
