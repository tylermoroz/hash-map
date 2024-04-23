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
}

const newTable = new HashMap();
newTable.set("dave", "smith");
newTable.set("darryl", "dixon");
newTable.set("tyler", "moroz");
newTable.print();
console.log(newTable.get("tyler"));
console.log(newTable.get("darryl"));
console.log(newTable.get("dave"));
console.log(newTable.get("melissa"));
