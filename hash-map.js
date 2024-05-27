#!/usr/bin/node

//import LinkedList class from the linked-list module
import LinkedList from "./linked-list.js";

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = [];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  toString(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];
    let current = bucket.head;
    let output = "";
    if (!current) {
      console.log(`output: ${null}`);
      return;
    }
    while (current) {
      output += `( ${Object.keys(current.value)}: ${Object.values(
        current.value
      )} ) -> `;
      current = current.nextNode;
    }
    output += `${null}`;
    console.log(`output: ${output}`);
  }

  set(key, value) {
    let index = this.hash(key);
    let bucket = this.buckets[index];
    if (!bucket) {
      const newList = new LinkedList();
      newList.append({ [key]: value });
      this.buckets[index] = newList;
    } else {
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
    console.log(this.buckets);
  }

  get(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];
    let entry = bucket.head;
    while (entry) {
      if (key in entry.value) {
        return entry.value[key];
      }
      entry = entry.nextNode;
    }
    return null;
  }

  has(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];
    if (!bucket) {
      return false;
    }
    let entry = bucket.head;
    while (entry) {
      if (key in entry.value) {
        return true;
      }
      entry = entry.nextNode;
    }
    return false;
  }

  remove(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];
    if (!bucket) {
      return false;
    }
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
        return true;
      }
      prevNode = nodeToRemove;
      nodeToRemove = nodeToRemove.nextNode;
    }
    return false;
  }
}

const table = new HashMap();
table.set("tyler", "moroz");
table.set("tyler", "jackson");
table.set("relyt", "wilson");
table.set("darryl", "moroz");
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
