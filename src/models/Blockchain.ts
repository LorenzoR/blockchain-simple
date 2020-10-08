import Block from './Block';

class Blockchain {
  private blocks: Block[];

  private prefix: number;

  public constructor(prefix: number) {
    this.prefix = prefix;
    this.blocks = [];
  }

  public addBlock(data: string): Block {
    const previousHash = this.blocks.length === 0 ?
      '0' : this.blocks[this.blocks.length - 1].getHash();
    const newBlock = new Block(data, previousHash, (new Date()).getTime());

    newBlock.mineBlock(this.prefix);

    this.blocks.push(newBlock);

    return newBlock;
  }

  public getBlock(index: number): Block {
    if (index < 0 || index >= this.blocks.length) {
      throw new Error(`Index ${index} is invalid`);
    }

    return this.blocks[index];
  }

  public isChainValid(): boolean {
    const prefixString = String('').padStart(this.prefix, '0');
    let flag = true;
    for (let i = 0; i < this.blocks.length; i += 1) {
      const previousHash = i === 0 ? '0' : this.blocks[i - 1].getHash();
      flag = this.blocks[i].getHash() === this.blocks[i].calculateBlockHash()
          && previousHash === this.blocks[i].getPreviousHash()
          && this.blocks[i].getHash().substring(0, this.prefix) === prefixString;
      if (!flag) {
        break;
      }
    }

    return flag;
  }

  public printChain(): void {
    for (let i = 0; i < this.blocks.length; i += 1) {
      console.log(`Block ${i}`);
      console.log(`Data: ${this.blocks[i].getData()}`);
      console.log(`Hash: ${this.blocks[i].getHash()}`);
      console.log(`Previos Hash: ${this.blocks[i].getPreviousHash()}`);
    }
  }

}

export default Blockchain;
