#!/usr/bin/node

//import LinkedList class from the linked-list module
import LinkedList from "./linked-list.js";

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array();
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) {
      const newList = new LinkedList();
      newList.append({ [key]: value });
      this.buckets[index] = newList;
    } else {
      let entry = bucket.getHead();
      while (entry) {
        if (key in entry.value) {
          entry.value[key] = value;
          return;
        }
        entry = entry.nextNode;
      }
      bucket.append({ [key]: value });
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) {
      return null;
    }
    let entry = bucket.getHead();
    while (entry) {
      if (key in entry.value) {
        return entry.value[key];
      }
      entry = entry.nextNode;
    }
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) {
      return false;
    }
    let entry = bucket.getHead();
    while (entry) {
      if (key in entry.value) {
        return true;
      }
      entry = entry.nextNode;
    }
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) {
      return false;
    }
    let entry = bucket.getHead();
    while (entry) {
      if (key in entry.value) {
        delete entry.value;

        if (!entry.value && entry.nextNode === null) {
          delete this.buckets[index];
        }
        return true;
      }
    }
  }

  toString(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];
    let current = bucket.getHead();
    let output = "";

    while (current) {
      output += `( ${current.value[key]} ) -> `;
      current = current.nextNode;
    }
    output += `${null}`;
    console.log(`output: ${output}`);
  }

  length() {
    return Object.keys(this.buckets).length;
  }
}

const table = new HashMap();
table.set("tyler", "moroz");
table.set("darryl", "moroz");
table.set("relyt", "mitchell");
// console.log("get:", table.get("relyt"));
// console.log("get:", table.get("lerty"));
// console.log("get:", table.get("rick"));
// console.log("has:", table.has("darryl"));
// console.log("has:", table.has("john"));
console.log("remove:", table.remove("tyler"));
// console.log("remove:", table.remove("donald"));
// console.log(table.buckets[4]);
console.log(table.buckets[4]);
// console.log(table.length());
table.toString("tyler");

// clear() {
//   this.buckets = [];
//   return this.buckets;
// }
// keys() {
//   let keys = [];
//   for (const key in this.buckets) {
//     for (let i = 0; i < this.buckets[key].length; i++) {
//       keys.push(this.buckets[key][i][0]);
//     }
//   }
//   return keys;
// }
// values() {
//   let values = [];
//   for (const key in this.buckets) {
//     for (let i = 0; i < this.buckets[key].length; i++) {
//       values.push(this.buckets[key][i][1]);
//     }
//   }
//   return values;
// }
// entries() {
//   let entries = [];
//   for (const entry in this.buckets) {
//     for (let i = 0; i < this.buckets[entry].length; i++) {
//       entries.push([this.buckets[entry][i][0], this.buckets[entry][i][1]]);
//     }
//   }
//   return entries;
// }
// }

// const table = new HashMap();
// table.set("dave", "smith");
// table.set("darryl", "dixon");
// table.set("tyler", "moroz");
// table.set("carla", "reyes");
// table.set("carlos", "benson");
// console.log(table.get("tyler"));
// console.log(table.get("darryl"));
// console.log(table.get("dave"));
// console.log(table.get("melissa"));
// console.log(table.has("tyler"));
// console.log(table.has("carter"));
// console.log(table.remove("tyler"));
// console.log(table.remove("carter"));
// console.log(table.remove("dave"));
// console.log(table);
// console.log(table.length());
// // console.log(table.clear());
// console.log(table.keys());
// console.log(table.values());
// console.log(table.entries());
// table.set("darryl", "moroz");
// console.log(table.entries());
