//Import LinkedList class from the linked-list module
import LinkedList from "./linked-list.js";

// Define the HashMap class
class HashMap {
  // The constructor initializes the hash map with default settings
  constructor() {
    // Set the initial capacity of the hash map
    this.capacity = 16;

    // Define the load factor threshold for resizing the hash map
    this.loadFactor = 0.75;

    // Create an array of buckets to store linked lists of key-value pairs
    this.buckets = new Array(this.capacity).fill(null);

    // Track the total number of keys in the hash map
    this.totalKeys = 0;
  }

  // Hash function to generate an index for a given key
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    // Compute hash code using a prime number multiplier and character codes of the key
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    // Return the computed hash code as the index
    return hashCode;
  }

  // Method to convert a key to a string representation
  toString(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    // If the bucket is empty, output null
    if (!bucket) {
      console.log(`output: ${null}`);
      return;
    }
    let current = bucket.head;
    let output = "";

    // If the bucket's linked list is empty, output null
    if (!current) {
      console.log(`output: ${null}`);
      return;
    }

    // Traverse the linked list and build the output string
    while (current) {
      output += `( ${Object.keys(current.value)}: ${Object.values(
        current.value
      )} ) -> `;
      current = current.nextNode;
    }
    output += `${null}`;

    // Print the output string
    console.log(`output: ${output}`);
  }

  // Method to resize the hash map when the load factor is exceeded
  grow() {
    // Check if resizing is needed based on the load factor
    if (this.totalKeys >= this.capacity * this.loadFactor) {
      // Double the capacity
      this.capacity = this.capacity * 2;

      // Save the current buckets
      const oldBuckets = this.buckets;

      // Create new buckets with the updated capacity
      this.buckets = new Array(this.capacity).fill(null);
      this.totalKeys = 0;

      // Rehash and reinsert existing entries into the new buckets
      for (const bucket of oldBuckets) {
        if (bucket) {
          let current = bucket.head;
          while (current) {
            this.set(
              Object.keys(current.value)[0],
              Object.values(current.value)[0]
            );
            current = current.nextNode;
          }
        }
      }
    }
  }

  // Method to add or update a key-value pair in the hash map
  set(key, value) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    // If the bucket is empty, create a new linked list and add the entry
    if (!bucket) {
      const newList = new LinkedList();
      newList.append({ [key]: value });
      this.buckets[index] = newList;
    } else {
      // Otherwise, update the existing entry or append a new entry
      let entry = bucket.head;
      while (entry) {
        if (key in entry.value) {
          entry.value[key] = value;
          return;
        }
        entry = entry.nextNode;
      }
      bucket.append({ [key]: value });
    }

    // Increment the total number of keys and check if resizing is needed
    this.totalKeys++;
    this.grow();
  }

  // Method to retrieve the value for a given key
  get(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    // If the bucket is empty, return null
    if (!bucket) return null;

    // Traverse the linked list to find the entry with the given key
    let entry = bucket.head;
    while (entry) {
      if (key in entry.value) {
        return entry.value[key];
      }
      entry = entry.nextNode;
    }

    // If the key is not found, return null
    return null;
  }

  // Method to check if a key exists in the hash map
  has(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    // If the bucket is empty, return false
    if (!bucket) {
      return false;
    }

    // Traverse the linked list to find the entry with the given key
    let entry = bucket.head;
    while (entry) {
      if (key in entry.value) {
        return true;
      }
      entry = entry.nextNode;
    }

    // If the key is not found, return false
    return false;
  }

  // Method to remove a key-value pair from the hash map
  remove(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    // If the bucket is empty, return false
    if (!bucket) {
      return false;
    }

    // Traverse the linked list to find and remove the entry with the given key
    let nodeToRemove = bucket.head;
    let prevNode = null;
    while (nodeToRemove) {
      if (key in nodeToRemove.value) {
        if (prevNode === null) {
          bucket.head = nodeToRemove.nextNode;
        } else {
          prevNode.nextNode = nodeToRemove.nextNode;
        }
        bucket.size--;
        this.totalKeys--;
        return true;
      }
      prevNode = nodeToRemove;
      nodeToRemove = nodeToRemove.nextNode;
    }

    // If the key is not found, return false
    return false;
  }

  // Method to get the total number of keys in the hash map
  length() {
    return this.totalKeys;
  }

  // Method to clear all key-value pairs from the hash map
  clear() {
    this.buckets = new Array(this.capacity).fill(null);
  }

  // Method to get all keys in the hash map
  keys() {
    let keys = [];

    // Traverse all buckets and collect keys from each linked list
    for (let i = 0; i < this.buckets.length; i++) {
      let bucket = this.buckets[i];
      if (bucket && bucket.head) {
        keys.push(Object.keys(bucket.head.value)[0]);
      }
    }
    return keys;
  }

  // Method to get all values in the hash map
  values() {
    let values = [];

    //Traverse all buckets and collect values from each linked list
    for (let i = 0; i < this.buckets.length; i++) {
      let bucket = this.buckets[i];
      if (bucket && bucket.head) {
        values.push(Object.values(bucket.head.value)[0]);
      }
    }
    return values;
  }

  // Method to get all entries (key-value pairs) in the hash map
  entries() {
    let entries = [];

    // Traverse all buckets and collect entries from each linked list
    for (let i = 0; i < this.buckets.length; i++) {
      let bucket = this.buckets[i];
      if (bucket && bucket.head) {
        entries.push([
          Object.keys(bucket.head.value)[0],
          Object.values(bucket.head.value)[0],
        ]);
      }
    }
    return entries;
  }
}

const table = new HashMap();
table.set("tyler", "moroz");
table.set("tyler", "jackson");
table.set("relyt", "wilson");
table.set("darryl", "moroz");
table.set("jake", "johnson");
table.set("quinn", "marquez");
table.set("holly", "burreu");
table.set("jessica", "hilton");
table.set("hildy", "watts");
table.set("kelly", "mills");
table.set("hannah", "donaldson");
table.set("rachel", "olisten");
table.set("penny", "carver");
table.set("wanda", "innis");
table.set("ellis", "fantis");
table.set("henry", "anders");
table.set("glenn", "junta");
table.set("seth", "henten");
table.set("lisa", "lockstray");
table.toString("tyler");
console.log(table.get("relyt"));
console.log(table.get("darryl"));
console.log(table.has("relyt"));
console.log(table.has("darryl"));
table.toString("darryl");
console.log(table.remove("tyler"));
console.log(table.remove("darryl"));
table.toString("tyler");
table.toString("darryl");
console.log(table.length());
console.log(table.keys());
console.log(table.values());
console.log(table.buckets);
console.log(table.entries());
console.log("capacity:", table.capacity);
console.log("total keys:", table.length());
