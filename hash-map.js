#!/usr/bin/node

//import LinkedList class from the linked-list module
import LinkedList from "./linked-list.js";

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity).fill(null);
    this.totalKeys = 0;
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
    if (!bucket) {
      console.log(`output: ${null}`);
      return;
    }
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

  grow() {
    if (this.totalKeys >= this.capacity * this.loadFactor) {
      this.capacity = this.capacity * 2;
      const oldBuckets = this.buckets;
      this.buckets = new Array(this.capacity).fill(null);
      this.totalKeys = 0;

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
    this.totalKeys++;
    this.grow();
  }

  get(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];
    if (!bucket) return null;
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
        this.totalKeys--;
        return true;
      }
      prevNode = nodeToRemove;
      nodeToRemove = nodeToRemove.nextNode;
    }
    return false;
  }

  length() {
    return this.totalKeys;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null);
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let bucket = this.buckets[i];
      if (bucket && bucket.head) {
        keys.push(Object.keys(bucket.head.value)[0]);
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let bucket = this.buckets[i];
      if (bucket && bucket.head) {
        values.push(Object.values(bucket.head.value)[0]);
      }
    }
    return values;
  }

  entries() {
    let entries = [];
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
