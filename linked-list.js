// Import Node class from node module
import Node from "./node.js";

// Define the LinkedList class and export for use in the hash-map module
export default class LinkedList {
  // The constructor initializes the linked list with a head and size
  constructor() {
    // The head property is a reference to the first node in the list, initially set to null
    this.head = null;

    // The size property keeps track of the number of nodes in the list, initially set to 0
    this.size = 0;
  }

  // The append method adds a new node with the given value to the end of the list
  append(value) {
    // Create a new node with the given value
    const node = new Node(value);

    // If the list is empty, set the new node as the head
    if (this.head === null) {
      this.head = node;
    } else {
      // Otherwise, find the last node in the list
      let prev = this.head;

      // Traverse the list until the last node is found
      while (prev.nextNode !== null) {
        prev = prev.nextNode;
      }

      // Set the nextNode of the last node to the new node
      prev.nextNode = node;
    }

    // Increment the size of the list
    this.size++;
  }

  //returns the head node of the linked list
  getHead() {
    return this.head;
  }
}
