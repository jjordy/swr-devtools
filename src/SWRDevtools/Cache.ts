
export default class DevToolsCache {
  __cache: Map<string, any>;
  __listeners: any[];
  constructor(initialData: any = {}) {
    this.__cache = new Map(Object.entries(initialData));
    this.__listeners = [];
  }
  set(key: any, value: any): any {
    const [_key] = this.serializeKey(key);
    this.__cache.set(_key, value);
    this.notify();
  }
  get(key: any) {
    const [_key] = this.serializeKey(key);
    return this.__cache.get(_key);
  }
  keys() {
    return Array.from(this.__cache.keys());
  }

  serializeKey(key: any): [string, any, string] {
    let args = null;
    if (typeof key === "function") {
      try {
        key = key();
      } catch (err) {
        // dependencies not ready
        key = "";
      }
    }

    if (Array.isArray(key)) {
      // args array
      args = key;
      key = hash(key);
    } else {
      // convert null to ''
      key = String(key || "");
    }

    const errorKey = key ? "err@" + key : "";

    return [key, args, errorKey];
  }

  has(key: any) {
    const [_key] = this.serializeKey(key);
    return this.__cache.has(_key);
  }

  delete(key: any) {
    const [_key] = this.serializeKey(key);
    this.__cache.delete(_key);
    this.notify();
  }

  subscribe(listener: any) {
    if (typeof listener !== "function") {
      throw new Error("Expected the listener to be a function.");
    }

    let isSubscribed = true;
    this.__listeners.push(listener);

    return () => {
      if (!isSubscribed) return;
      isSubscribed = false;
      const index = this.__listeners.indexOf(listener);
      if (index > -1) {
        this.__listeners[index] = this.__listeners[this.__listeners.length - 1];
        this.__listeners.length--;
      }
    };
  }

  private notify() {
    for (let listener of this.__listeners) {
      listener();
    }
  }
}

const UNDEFINED: undefined = ({} as any)[0];
const isFunction = (v: any): v is Function => typeof v === "function";
// use WeakMap to store the object->key mapping
// so the objects can be garbage collected.
// WeakMap uses a hashtable under the hood, so the lookup
// complexity is almost O(1).
const table = new WeakMap();

// counter of the key
let counter = 0;

// hashes an array of objects and returns a string
function hash(args: any[]): string {
  if (!args.length) return "";
  let key = "arg";
  for (let i = 0; i < args.length; ++i) {
    const arg = args[i];

    let _hash: any = UNDEFINED;
    if (arg === null || (typeof arg !== "object" && !isFunction(arg))) {
      // need to consider the case that `arg` is a string:
      // "undefined" -> '"undefined"'
      // 123         -> '123'
      // "null"      -> '"null"'
      // null        -> 'null'
      _hash = JSON.stringify(arg);
    } else {
      if (!table.has(arg)) {
        _hash = counter;
        table.set(arg, counter++);
      } else {
        _hash = table.get(arg);
      }
    }
    key += "$" + _hash;
  }
  return key;
}