// import Node class from node module
import Node from "./node.js";

// export LinkedList class for use in the hash-map module
export default class LinkedList {
  constructor() {
    this.head = null; // reference for the head Node of the LinkedList
    this.size = 0; // reference for the amount of Nodes in the LinkedList
    this.tail = null; // reference for the last Node in the LinkedList
  }

  // adds a Node to the end of the LinkedList
  append(value) {
    const node = new Node(value); // create new Node containing value

    // if the LinkedList is empty, add new Node the the start of the LinkedList
    if (this.head === null) {
      this.head = node;
    } else {
      // if the LinkedList is not empty...

      let prev = this.head; // reference to the head

      // increment the head reference until it points to the last Node in the LinkedList
      while (prev.nextNode !== null) {
        prev = prev.nextNode;
      }

      // when the head reference is pointing to the last Node in the LinkedList, append the new Node after it
      prev.nextNode = node;
    }
    this.size++; // increment list size by 1
    this.tail = node; // make the new Node the end pointer in the LinkedList
  }

  // adds a new Node the the start of the LinkedList
  prepend(value) {
    const node = new Node(value); // create new Node containing value

    // if the LinkedList is empty, add new Node the the start of the LinkedList
    if (this.head === null) {
      this.head = node;
    } else {
      // if the LinkedList is not empty...

      // move the Node with the previous head reference to the next available position
      node.nextNode = this.head;

      // add the new Node to the start of the LinkedList
      this.head = node;
    }
    this.size++; // increment the size of the LinkedList by 1
  }

  // returns the size of the LinkedList
  getSize() {
    return this.size;
  }

  // returns the first element in the LinkedList
  getHead() {
    return this.head;
  }

  // returns the last element in the LinkedList
  getTail() {
    return this.tail;
  }

  // returns the Node at the given index
  at(index) {
    // return null if the given index is out of bounds
    if (index < 0 || index > this.size) {
      return null;
    }

    // create a reference to the head pointer
    let current = this.head;

    // loop through the indexes until it reaches the given index
    for (let i = 0; i < index; i++) {
      // update the reference to the head pointer to the next position with every loop iteration
      current = current.nextNode;

      // return the Node at the current pointer when the iteration reaches the given index
      if (i === index - 1) {
        return current;
      }
    }
  }

  // removes the last element of the LinkedList
  pop() {
    // if the LinkedList is empty, exit the function
    if (this.head === null) {
      return;
    }

    // if the head Node is the only element in the LinkedList, remove the head Node
    if (this.head.nextNode === null) {
      this.head = null;
    }

    // create a reference to the head pointer
    let current = this.head;

    // create a juggling pointer for current and set it to null
    let prev = null;

    // iterate this loop until the current pointer points to the last Node in the LinkedList
    while (current.nextNode) {
      // set the prev variable to the current Node of the current pointer
      prev = current;

      // set the current pointer to the next Node
      current = current.nextNode;

      // set the tail reference to the second last Node in the LinkedList through the prev pointer
      this.tail = prev;
    }

    // remove the last Node in the LinkedList
    prev.nextNode = null;

    // reduce the size of the LinkedList by 1
    this.size--;
  }

  // checks if the passed in value is in the LinkedList
  contains(value) {
    // create a reference to the head pointer
    let current = this.head;

    // iterate this loop until the current pointer points to the last Node in the LinkedList
    while (current.nextNode) {
      // return true if one of the Nodes contains the given value
      if (current.value === value) {
        return true;
      } else if (current.value !== value) {
        // if the given value isn't in the current iteration then change the current pointer to the next Node
        current = current.nextNode;
      }
    }

    // if the given value has not been found in the while loop, check the last Node in the LinkedList
    if (current.value === value) {
      // return true if the given value exists
      return true;
    } else {
      // return false if the given value does not exist
      return false;
    }
  }

  // returns the index of the Node containing the given value
  find(value) {
    // create index starting value
    let index = 0;

    // create a reference to the head pointer
    let current = this.head;

    // iterate this loop as long as the head pointer exists
    while (current) {
      // if the given value is in the Node that the current pointer is referencing, return the index variable value
      if (current.value === value) {
        return index;
      }

      // update the head pointer reference to the next Node in the LinkedList during every iteration
      current = current.nextNode;

      // increase the index value by 1 during every iteration
      index++;
    }

    // return null if the given value is not found in the LinkedList
    return null;
  }

  // represents the LinkedList Nodes as strings and prints them in order
  toString() {
    // create a reference to the head pointer
    let current = this.head;

    // create an empty string to store the Nodes
    let output = "";

    // iterate over this loop as long as the head pointer exists
    while (current) {
      // add the value of the Node that the current pointer references to the output string during every iteration
      output += `( ${current.value} ) -> `;

      // update the head pointer reference to the next Node in the LinkedList during every iteration
      current = current.nextNode;
    }

    // when the loop is finished, add a null value to the end of the output string
    output += `${null}`;

    // log the final output string to the console
    console.log(`output: ${output}`);
  }

  // inserts a new Node at the given index
  insertAt(value, index) {
    // if the given index is out of bounds, exit the function
    if (index < 0 || index > this.size) {
      return;
    }

    // if the given index is equal to 0, add the Node to the start of the list with the prepend method
    if (index === 0) {
      this.prepend(value);
    } else {
      // if the given index is greater than equal to 0 but still in bounds...

      // create a new Node containing the given value
      const node = new Node(value);

      // create a reference to the head pointer
      let prev = this.head;

      // iterate over the loop until i reaches the value one less than the given index
      for (let i = 0; i < index - 1; i++) {
        // update the head pointer reference to the next Node in the LinkedList during every iteration
        prev = prev.nextNode;
      }

      // update the nextNode of the new Node with the nextNode of the head pointer reference
      node.nextNode = prev.nextNode;

      // update the head pointer reference's nextNode with the new Node
      prev.nextNode = node;

      //increase the size of the LinkedList by 1
      this.size++;
    }
  }

  // removes the Node at the given index
  removeAt(index) {
    // if the given index is out of bounds, exit the function
    if (index < 0 || index > this.size) {
      return;
    } else {
      // if the given index is greater than equal to 0 but still in bounds...

      // create a current variable to juggle the head pointer reference and set it to null
      let current = null;

      // create a reference to the head pointer
      let prev = this.head;

      // iterate over the loop until i reaches the given index
      for (let i = 0; i < index; i++) {
        // update the current variable to equal the prev variable during every iteration
        current = prev;

        // update the prev variable to equal the nextNode of the prev variable during every iteration
        prev = prev.nextNode;
      }

      // if the nextNode of the current pointer reference is equal to the Node of the tail pointer reference, update the tail pointer reference to the Node of the current pointer reference
      if (current.nextNode === this.tail) {
        this.tail = current;
      }

      // update nextNode of the current pointer to equal the prev pointer's nextNode
      current.nextNode = prev.nextNode;

      // update the prev pointer's nextNode to equal the current pointer
      prev.nextNode = current;

      // reduce the size of the LinkedList by 1
      this.size--;
    }
  }
}
