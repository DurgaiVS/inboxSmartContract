// deploy code will go here
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import solScr from './compile.js';

const provider = new HDWalletProvider(
    'picnic lens patrol mistake able escape abstract airport skin accuse cry hockey',
    'https://rinkeby.infura.io/v3/2b2294c92cef418784bac81ded456689'
);
//This will use the mnemonic to connect to our account(using public & private key & address)
//The link specified is used to connect to the infura node [Can host a node on our local machine]

const web3 = new Web3(provider);
//This is specifically for rinkeby network to send/receive test ether

const deploy = async () => {
    try {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);
    const inbox = await new web3.eth.Contract(JSON.parse(solScr.interface))
      .deploy({data: solScr.bytecode, arguments: ['Hi There!']})
      .send({from: accounts[0], gas: '1000000'});
  
    console.log('Deployed to', inbox.options.address)
    //displaying the address of the contract deployed.
    provider.engine.stop();
    //end the process
    } catch (e) {
        console.error(e)
    }
}
deploy();