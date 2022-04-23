import { Prompt } from 'enquirer'

class Status extends Prompt {
  clear!: () => void;
  write!: (message: string) => void;

  set(status: string) {
    this.clear();
    this.write(`> ${status}`);
  }

  next() {
    console.log('');
  }
}

export const status = new Status();