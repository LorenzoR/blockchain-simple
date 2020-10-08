import Blockchain from '../../src/models/Blockchain';

const prefix = 4;

describe('blockchain model', () => {
  it('can create a blockchain', () => {
    const blockchain = new Blockchain(prefix);

    expect(blockchain !== null).toBe(true);
  });

  it('can add a block', async () => {
    const blockchain = new Blockchain(prefix);
    const data = 'test';
    const newBlock = blockchain.addBlock(data);

    expect(newBlock.getData()).toBe(data);
  });

  it('can validate blockchain', async () => {
    const blockchain = new Blockchain(prefix);

    blockchain.addBlock('test 1');
    blockchain.addBlock('test 2');
    blockchain.addBlock('test 3');

    expect(blockchain.isChainValid()).toBe(true);
  });

  it('can detect invalid chain when block modified', async () => {
    const blockchain = new Blockchain(prefix);

    blockchain.addBlock('test 1');
    blockchain.addBlock('test 2');
    blockchain.addBlock('test 3');

    // Change a block
    blockchain.getBlock(1).setData('change data');

    expect(blockchain.isChainValid()).toBe(false);
  });

  it('can print blockchain', async () => {
    const blockchain = new Blockchain(prefix);

    blockchain.addBlock('test 1');
    blockchain.addBlock('test 2');
    blockchain.addBlock('test 3');

    expect(blockchain.printChain()).toBe(undefined);
  });
});
