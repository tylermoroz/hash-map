// Define the Node class and export for use in the linked-list module
export default class Node {
  // The constructor initializes the node with a given value
  constructor(value) {
    // The value property stores the data for this node
    this.value = value;

    // The nextNode property is a reference to the next node in the list, initially set to null
    this.nextNode = null;
  }
}
