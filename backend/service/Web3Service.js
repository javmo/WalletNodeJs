const  Web3  = require('web3');
//const  web3 = new Web3(process.env.URI_PROVIDER);

class Web3Service {
   constructor() {
      this.web3 = new Web3(process.env.URI_PROVIDER);
   }

   createAccount(){
      return this.web3.eth.accounts.create();
   }

    getBalanceOf(account) {

        return this.web3.eth.getBalance(account)
            .then(accountBalanceWei => {
                return Number(this.web3.utils.fromWei(accountBalanceWei, 'ether'));
            })
            .catch(err => {
                throw new Error(err);
            })
    }

    send(fromAccount, toAccount, amountEth) {

      return this.web3.eth.sendTransaction({
            from: fromAccount,
            to: toAccount,
            value: this.web3.utils.toWei(amountEth.toString(), 'ether'),
            data: ""})
            .catch(err => {
                throw new Error(err);
            })
    }

    async sendContract(address,abi,bytecode) {

        try {
            const constructorArgs = []

            let contract = new this.web3.eth.Contract(abi)
            contract = await contract.deploy({
                data: bytecode,
                arguments: constructorArgs
            })
                .send({
                from: address,
                gas: 1500000,
                gasPrice: '30000000000'
            })
                .then(function(newContractInstance){
                    console.log(newContractInstance.options.address) // instance with the new contract address
                })
                .catch(err => {
                    console.log(err)
                })

            console.log('contrac: '+contract);
            return contract;





        } catch (e) {
            console.log('[erro send contract]' + e.message)
        }
    }











        // Note that the script needs the ABI which is generated from the compilation artifact.
        // Make sure contract is compiled and artifacts are generated
      //  console.log(abi);

      //  console.log(abi)
       // const contract = new this.web3.eth.Contract([abi]);
      /*  let deploy_contract = new this.web3.eth.Contract([abi]);
       // console.log(JSON.parse(abi))

        // Function Parameter
        let payload = {
            data: bytecode
        }

        let parameter = {
            from: addrress,
            gas: this.web3.utils.toHex(800000),
            gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('30', 'gwei'))
        }
        // Function Call
     deploy_contract.deploy(payload).send(parameter, (err, transactionHash) => {
            console.log('Transaction Hash :', transactionHash);
            return transactionHash;
        }).on('confirmation', () => {}).then((newContractInstance) => {
            console.log('Deployed Contract Address : ', newContractInstance.options.address);
        })*/



/*

        return  contract.deploy({
            data: bytecode,
            arguments: constructorArgs,
            overwrite: false
        })
            .send({
                from: addrress
            }).then(newContractInstance => {
            console.log(newContractInstance.options.address)
            return newContractInstance
        })
*/


      /*  console.log('Contract deployed at address: ', newContractInstance.options.address)
        return newContractInstance;*/

}

const web3Service = new Web3Service();

module.exports = web3Service;



