// import Node class from node module
import Node from "./node.js";

// export LinkedList class for use in the hash-map module
export default class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let prev = this.head;

      while (prev.nextNode !== null) {
        prev = prev.nextNode;
      }

      prev.nextNode = node;
    }
    this.size++;
  }

  prepend(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      node.nextNode = this.head;

      this.head = node;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head;
  }

  toString() {
    let current = this.head;

    let output = "";

    while (current) {
      output += `( ${current.value} ) -> `;

      current = current.nextNode;
    }

    output += `${null}`;

    console.log(`output: ${output}`);
  }

  insertAt(value, index) {
    if (index < 0 || index > this.size) {
      return;
    }

    if (index === 0) {
      this.prepend(value);
    } else {
      const node = new Node(value);

      let prev = this.head;

      for (let i = 0; i < index - 1; i++) {
        prev = prev.nextNode;
      }

      node.nextNode = prev.nextNode;

      prev.nextNode = node;

      this.size++;
    }
  }

  removeAt(index) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      let current = null;

      let prev = this.head;

      for (let i = 0; i < index; i++) {
        current = prev;

        prev = prev.nextNode;
      }

      current.nextNode = prev.nextNode;

      prev.nextNode = current;

      this.size--;
    }
  }
}
