// Export Node class for use in linked-list module
export default class Node {
  constructor(value) {
    this.value = value; // value that represents the Node
    this.nextNode = null; // pointer for the next Node in the list
  }
}
