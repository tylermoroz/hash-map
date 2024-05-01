#!/usr/bin/node

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
    this.tail = null;
  }

  append(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let prev = this.head;
      while (prev.nextNode !== null) {
        prev = prev.nextNode;
      }
      prev.nextNode = node;
    }
    this.tail = node;
    this.size++;
  }

  prepend(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      node.nextNode = this.head;
      this.head = node;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  at(index) {
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.nextNode;
      if (i === index - 1) {
        return current;
      }
    }
  }

  pop() {
    if (this.head === null) {
      return;
    }
    if (this.head.nextNode === null) {
      this.head = null;
      return;
    }
    let current = this.head;
    let prev = null;
    while (current.nextNode) {
      prev = current;
      current = current.nextNode;
      this.tail = prev;
    }
    prev.nextNode = null;

    this.size--;
  }

  contains(value) {
    let current = this.head;

    while (current.nextNode) {
      if (current.value === value) {
        return true;
      } else if (current.value !== value) {
        current = current.nextNode;
      }
    }
    if (current.value === value) {
      return true;
    }
    return false;
  }

  find(value) {
    let index = 0;
    let node = this.head;
    while (node) {
      if (node.value === value) {
        return index;
      }
      node = node.nextNode;
      index++;
    }
    return null;
  }

  toString() {
    let current = this.head;
    let output = "";
    while (current) {
      output += `( ${current.value} ) -> `;
      current = current.nextNode;
      if (current === null) {
        output += `${null}`;
      }
    }
    console.log(output);
  }

  insertAt(value, index) {
    if (index < 0 || index > this.size) {
      return;
    }
    if (index === 0) {
      this.prepend(value);
    } else {
      const node = new Node(value);
      let prev = this.head;
      for (let i = 0; i < index - 1; i++) {
        prev = prev.nextNode;
      }
      node.nextNode = prev.nextNode;
      prev.nextNode = node;
      this.size++;
    }
  }
  removeAt(index) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      let current = null;
      let prev = this.head;
      for (let i = 0; i < index; i++) {
        current = prev;
        prev = prev.nextNode;
      }
      if (current.nextNode === this.tail) {
        this.tail = current;
      }
      current.nextNode = prev.nextNode;
      prev.nextNode = current;
      this.size--;
    }
  }
}

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
        entry = entry.next;
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
      entry = entry.next;
    }
    return null;
  }

  has(key) {
    const code = this.hash(key);
    const bucket = this.buckets[code];
    if (!bucket) {
      return false;
    }
    let entry = bucket.getHead();
    while (entry) {
      if (key in entry.value) {
        return true;
      }
    }
  }

  remove(key) {
    const code = this.hash(key);
    const bucket = this.buckets[code];
    if (!bucket) {
      return false;
    }
    let entry = bucket.getHead();
    let nextEntry = entry.nextNode;
    while (entry) {
      if (key in entry.value) {
        delete entry.value;
        if (!entry.value && nextEntry === null) {
          delete this.buckets[code];
        }
        return true;
      }
    }
  }

  // length() {
  //   return Object.keys(this.buckets).length;
  // }

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
}

const table = new HashMap();
table.set("dave", "smith");
table.set("darryl", "dixon");
table.set("tyler", "moroz");
table.set("carla", "reyes");
table.set("carlos", "benson");
console.log(table.get("tyler"));
console.log(table.get("darryl"));
console.log(table.get("dave"));
console.log(table.get("melissa"));
console.log(table.has("tyler"));
console.log(table.has("carter"));
console.log(table.remove("tyler"));
console.log(table.remove("carter"));
console.log(table.remove("dave"));
console.log(table);
// console.log(table.length());
// // console.log(table.clear());
// console.log(table.keys());
// console.log(table.values());
// console.log(table.entries());
// table.set("darryl", "moroz");
// console.log(table.entries());
