// contract test code will go here
import assert from 'assert'
import ganache from 'ganache-cli'
import { describe } from 'mocha';
import Web3 from 'web3'
const web3 = new Web3(ganache.provider());
import solCode from '../compile.js' 
/*
Ganacheis a local test network & it will provide us with an unlocked accounts which we can use
to test our contract code, also it will complete the test instantaneously.
*/
//! web3 will always return a promise

let accounts;
let inbox;
const srtMsg = 'Hi There!' 
beforeEach(async () => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts();
    
    //use one acc to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(solCode.interface)) //Tells web3 about what methods an inbox contract has
      .deploy({
        data: solCode.bytecode, 
        arguments: [srtMsg]
      }) //Tells web3 that we want to deploy a new copy of this contract
      .send({
        from: accounts[0], 
        gas: '1000000'
      }) //Instructs web3 to send out a transaction that creates this contract
})

describe('Inbox Contract', () => {
    it('contractDeployed', () => {
        assert.ok(inbox.options.address); //checks whether it is any truthy value
        //the above test will be passed if the contract is successfully deployed to the network
        // if successfully deployed, it will get an address value, if not it won't
    });

    it('hasDefaultMsg',async () => {
        const msg = await inbox.methods.msg().call();
        //if there is any arguments to be passed, pass it in first ()
        //2nd () is used only when we make a transaction, it has account & gas details
        assert.equal(msg, srtMsg)
    });

    it('isSetMsgOK',async () => {
        await inbox.methods.setMsg('Bye There!').send({from: accounts[0]});
        //when making transaction, we receive a transaction hash for a successfull transaction
        //if the transaction is failed, then error will be thrown which will automatically fail the test
        const msg = await inbox.methods.msg().call();
        assert.equal(msg, 'Bye There!')
        //now checking whether the msg has updated correctly
    });
});







// class Car{
//     constructor() {}
//     park() {
//         return 'stopped';
//     }
//     drive() {
//         return 'vroom';
//     }
// }
// 
/*
describe('test title', callbackfn)
? Describe is used to group multiple it statements
it('test title', callbackfn)
? It is used to run a single test condition and check result
beforeEach(callbackfn)
? beforeEach is used to run a set of code before running
? each and every single "it" fn.

! There can be multiple it inside a describe
*/
// let car;
// beforeEach('carInitialization', () => {
//     car = new Car();
// });
// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('canDrive', () => {
//         assert.equal(car.drive(), 'vroom');
//     });
// });