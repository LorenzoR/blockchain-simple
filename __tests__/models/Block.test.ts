import Block from '../../src/models/Block';

const blockchain = [];
const prefix = 4;
const prefixString = String('').padStart(prefix, '0');

describe('block model', () => {
  it('can create a block', () => {
    const block = new Block('data', 'previous hash', (new Date()).getTime());

    expect(block !== null).toBe(true);
  });

  it('can mine a block', async () => {
    const newBlock = new Block('data', '0', (new Date()).getTime());

    newBlock.mineBlock(prefix);

    expect(newBlock.getHash().substring(0, prefix)).toBe(prefixString);
    blockchain.push(newBlock);
  });

  it('can mine another block', async () => {
    const lastBlock = blockchain[blockchain.length - 1];
    const newBlock = new Block('data', lastBlock.getHash(), (new Date()).getTime());

    newBlock.mineBlock(prefix);

    expect(newBlock.getHash().substring(0, prefix)).toBe(prefixString);
    blockchain.push(newBlock);
  });

  it('can validate blocks', async () => {
    let flag = true;
    for (let i = 0; i < blockchain.length; i += 1) {
      const previousHash = i === 0 ? '0' : blockchain[i - 1].getHash();
      flag = blockchain[i].getHash() === blockchain[i].calculateBlockHash()
          && previousHash === blockchain[i].getPreviousHash()
          && blockchain[i].getHash().substring(0, prefix) === prefixString;
      if (!flag) {
        break;
      }
    }
    expect(flag).toBe(true);
  });
});
