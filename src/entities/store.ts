export enum Stored {
  token = 'token',
  domain = 'domain',
  savePath = 'savePath',
}

export interface InnerStore {
  [Stored.token]?: string;
  [Stored.domain]?: string;
  [Stored.savePath]?: string;
  [key: string]: unknown
}

class Store {
  #innerStore: InnerStore = {}

  set<T = unknown>(key: string, value: T) {
    this.#innerStore[key] = value;
  }

  get(key: string) {
    return this.#innerStore[key];
  }

  has(key: string) {
    return this.#innerStore[key] !== undefined;
  }

  delete(key: string) {
    delete this.#innerStore[key];
  }

  clear() {
    this.#innerStore = {};
  }
}

export const store = new Store();

store.set(
  Stored.token, 
  '7dc3525499ce640c84e20064041b5d3580015a2ef687eebba22b6e18821710c9ecddf50739e4c112b0982'
);