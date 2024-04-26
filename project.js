#!/usr/bin/node

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = [];
  }

  print() {
    console.log(this.buckets);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [[key, value]];
    } else {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i][0] === key) {
          this.buckets[index][i][1] = value;
        }
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      return null;
    }
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        return this.buckets[index][i][1];
      }
    }
  }

  has(key) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      return false;
    }
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        return true;
      }
    }
  }

  remove(key) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      return false;
    }
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        delete this.buckets[index];
        return true;
      }
    }
  }

  length() {
    return Object.keys(this.buckets).length;
  }

  clear() {
    this.buckets = [];
    return this.buckets;
  }
}

const table = new HashMap();
table.set("dave", "smith");
table.set("darryl", "dixon");
table.set("tyler", "moroz");
table.print();
console.log(table.get("tyler"));
console.log(table.get("darryl"));
console.log(table.get("dave"));
console.log(table.get("melissa"));
console.log(table.has("tyler"));
console.log(table.has("carter"));
console.log(table.remove("tyler"));
console.log(table.remove("carter"));
console.log(table.length());
console.log(table.clear());
