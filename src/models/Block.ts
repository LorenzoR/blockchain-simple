import { createHash } from 'crypto';

class Block {
  public hash: string;

  public previousHash: string;

  public data: string;

  public timeStamp: number;

  public nonce: number;

  public constructor(data: string, previousHash: string, timeStamp: number) {
    this.data = data;
    this.previousHash = previousHash;
    this.timeStamp = timeStamp;
    this.nonce = 0;
    this.hash = this.calculateBlockHash();
  }

  public getHash(): string {
    return this.hash;
  }

  public getPreviousHash(): string {
    return this.previousHash;
  }

  public getData(): string {
    return this.data;
  }

  public setData(data: string): void {
    this.data = data;
  }

  public calculateBlockHash(): string {
    const dataToHash = this.previousHash
      + this.timeStamp.toString()
      + this.nonce.toString()
      + this.data;

    this.hash = this.digestMessage(dataToHash);

    return this.hash;
  }

  public mineBlock(prefix: number): string {
    const prefixString: string = String('').padStart(prefix, '0');

    if (!this.hash) {
      this.calculateBlockHash();
    }

    while (this.hash.substring(0, prefix) !== prefixString) {
      this.nonce += 1;
      this.hash = this.calculateBlockHash();
    }

    return this.hash;
  }

  private digestMessage(message: string): string {
    return createHash('sha256').update(message, 'utf8').digest('hex');
  }
}

export default Block;
