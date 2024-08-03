#!/usr/bin/node

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
    const index = this.hash(key);
    let bucket = this.buckets[index];

    // If the bucket is empty, output null
    if (!bucket) {
      console.log(`output: ${null}`);
      return;
    }
    let current = bucket.getHead();
    let output = "";

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
    if (this.totalKeys > this.capacity * this.loadFactor) {
      // Double the capacity
      this.capacity *= 2;

      // Save the current buckets
      const oldBuckets = this.buckets;

      // Create new buckets with the updated capacity
      this.buckets = new Array(this.capacity).fill(null);
      this.totalKeys = 0;

      // Rehash and reinsert existing entries into the new buckets
      for (const bucket of oldBuckets) {
        if (bucket) {
          let current = bucket.getHead();
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
    const index = this.hash(key);
    let bucket = this.buckets[index];

    // If the bucket is empty, create a new linked list and add the entry
    if (!bucket) {
      const newList = new LinkedList();
      newList.append({ [key]: value });
      this.buckets[index] = newList;
    } else {
      // Otherwise, update the existing entry or append a new entry
      let current = bucket.getHead();
      while (current) {
        if (key in current.value) {
          current.value[key] = value;
          return;
        }
        current = current.nextNode;
      }
      bucket.append({ [key]: value });
    }

    // Increment the total number of keys and check if resizing is needed
    this.totalKeys++;
    this.grow();
  }

  // Method to retrieve the value for a given key
  get(key) {
    const index = this.hash(key);
    let bucket = this.buckets[index];

    // If the bucket is empty, return null
    if (!bucket) return null;

    // Traverse the linked list to find the entry with the given key
    let current = bucket.getHead();
    while (current) {
      if (key in current.value) {
        return current.value[key];
      }
      current = current.nextNode;
    }

    // If the key is not found, return null
    return null;
  }

  // Method to check if a key exists in the hash map
  has(key) {
    const index = this.hash(key);
    let bucket = this.buckets[index];

    // If the bucket is empty, return false
    if (!bucket) {
      return false;
    }

    // Traverse the linked list to find the entry with the given key
    let current = bucket.getHead();
    while (current) {
      if (key in current.value) {
        return true;
      }
      current = current.nextNode;
    }

    // If the key is not found, return false
    return false;
  }

  // Method to remove a key-value pair from the hash map
  remove(key) {
    const index = this.hash(key);
    let bucket = this.buckets[index];

    // If the bucket is empty, return false
    if (!bucket) {
      return false;
    }

    // Traverse the linked list to find and remove the entry with the given key
    let current = bucket.getHead();
    let prev = null;
    while (current) {
      if (key in current.value) {
        if (prev === null) {
          bucket.head = current.nextNode;
        } else {
          prev.nextNode = current.nextNode;
        }
        bucket.size--;
        this.totalKeys--;
        return true;
      }
      prev = current;
      current = current.nextNode;
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
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null);
  }

  // Method to get all keys in the hash map
  keys() {
    let keys = [];

    // Traverse all buckets and collect keys from each linked list
    for (let i = 0; i < this.buckets.length; i++) {
      let bucket = this.buckets[i];
      if (bucket && bucket.head) {
        let current = bucket.getHead();
        while (current) {
          keys.push(Object.keys(current.value)[0]);
          current = current.nextNode;
        }
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
        let current = bucket.getHead();
        while (current) {
          values.push(Object.values(current.value)[0]);
          current = current.nextNode;
        }
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
        let current = bucket.getHead();
        while (current) {
          entries.push([
            Object.keys(current.value)[0],
            Object.values(current.value)[0],
          ]);
          current = current.nextNode;
        }
      }
    }
    return entries;
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "blue");
test.set("jacket", "white");
test.set("kite", "red");
test.set("lion", "golden");
test.set("moon", "silver");
console.log(test.get("jacket"));
console.log(test.has("kite"));
console.log(test.remove("apple"));
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.toString("dog");
test.clear();

console.log(test.buckets);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "blue");
test.set("jacket", "white");
test.set("kite", "red");
test.set("lion", "golden");
test.set("moon", "silver");
console.log(test.get("jacket"));
console.log(test.has("kite"));
console.log(test.remove("apple"));
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.toString("apple");

console.log(test.buckets);
