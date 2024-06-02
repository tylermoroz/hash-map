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
}
