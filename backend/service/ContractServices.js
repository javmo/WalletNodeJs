const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');
const web3Service = require("../service/Web3Service");


class ContractServices {
    contractsAssembly;

    constructor(contract) {
        this.contract = contract;
        this.contractPath = path.join(__dirname, 'contracts', contract);
       // this.source = fs.readFileSync(this.contractPath, 'UTF-8');

        this.input = {
            language: 'Solidity',
            sources: { },
            settings: {
                outputSelection: {
                    '*': {
                        '*': [ '*' ]
                    }
                }
            }
        }
        this.input.sources = {}
        this.input.sources[contract] = {content: fs.readFileSync(path.resolve(__dirname, '../contracts', this.contract), 'utf8')}
    }

    compilingPreperations() {
        const buildPath = path.resolve(__dirname, '../artifacts');
        fs.removeSync(buildPath);
        return buildPath;
    }

    getImports(dependency) {
        console.log('Searching for dependency: ', dependency);
        switch (dependency) {
            case this.contract:
                return {contents: fs.readFileSync(path.resolve(__dirname, '../contracts', this.contract), 'utf8')};
            /*case 'AnotherImportedSolidityFile.sol':
                return {contents: fs.readFileSync(path.resolve(__dirname, 'contracts', 'AnotherImportedSolidityFile.sol'), 'utf8')};*/
            default:
                return {error: 'File not found'}
        }
    }

    compileSources() {
        try {
            return JSON.parse(solc.compile(JSON.stringify(this.input), this.getImports()));
        } catch (e) {
            console.log(e);
        }
    }

    errorHandling(compiledSources) {
        if (!compiledSources) {
            console.error('>>>>>>>>>>>>>>>>>>>>>>>> ERRORS <<<<<<<<<<<<<<<<<<<<<<<<\n', 'NO OUTPUT');
        } else if (compiledSources.errors) { // something went wrong.
            console.error('>>>>>>>>>>>>>>>>>>>>>>>> ERRORS <<<<<<<<<<<<<<<<<<<<<<<<\n');
            compiledSources.errors.map(error => console.log(error.formattedMessage));
        }
    }

    writeOutput(compiled, buildPath) {
        fs.ensureDirSync(buildPath);

        for (let contractFileName in compiled.contracts[this.contract]) {
            const contractName = contractFileName.replace('.sol', '');
            console.log('Writing: ', contractName + '.json');
            fs.outputJsonSync(
                path.resolve(buildPath, contractName + '.json'),
                compiled.contracts[this.contract][contractName]
            );
        }
    }



    compileContract() {

        console.log('> Compiling ' + this.contract );
        this.contractsAssembly = JSON.parse(solc.compile(JSON.stringify(this.input)), this.getImports);
        console.log(this.contractsAssembly.contracts);


        for (const contractName in this.contractsAssembly.contracts[this.contract]) {

           const pathw = path.join(__dirname, '../artifacts', contractName+'.json')
            fs.writeFileSync(pathw,
                JSON.stringify(this.contractsAssembly.contracts[this.contract][contractName])
                , 'UTF-8',function(err){
                    if(err) throw err;
                })
            console.log('------------------------'+[contractName]+'------------------------');

            console.log('> Contract compiled successfully: ' + contractName);
            console.log('> abi: '+ this.contractsAssembly.contracts[this.contract].abi);
            console.log('> bytecode: ' + this.contractsAssembly.contracts[this.contract][contractName].evm.bytecode.object);
            console.log('> gasEstimates ');
            if(this.contractsAssembly.contracts[this.contract][contractName].evm.gasEstimates != null){
                console.log('>>> codeDepositCost: ' + this.contractsAssembly.contracts[this.contract][contractName].evm.gasEstimates.creation.codeDepositCost);
                console.log('>>> executionCost  : ' + this.contractsAssembly.contracts[this.contract][contractName].evm.gasEstimates.creation.executionCost);
                console.log('>>                   ');
                console.log('>>> totalCost      : ' + this.contractsAssembly.contracts[this.contract][contractName].evm.gasEstimates.creation.totalCost);
            }
            console.log('\n');
        }
    }

    deploy(address, artifacts, buildPath) {
        artifacts.forEach(artifact => {
           const artifactData = JSON.parse(fs.readFileSync(path.resolve(buildPath, artifact + '.json'), 'UTF-8'));
            console.log('> Deploying contract: ' + artifact);
            console.log('--------------------------');
            if(artifactData.evm.bytecode.object.length != 0){
                web3Service.sendContract(address,artifactData.abi,artifactData.evm.bytecode.object)
                    .then(newContractInstance => {
                        console.log(newContractInstance);
                    })
                    .catch(err => {
                        console.log(err);
                    })

            } else {
                console.log('>> [INFO] This contract ' + artifact + ' may be abstract, not implement an abstract parent\'s methods completely or not invoke an inherited contract\'s constructor correctly. ')
            }
        })

    }

    async deployContract(address) {
        console.log('Deploying contracts');
        console.log('=========================================');
        console.log('\n');

            let contractsDeploy;
            for (const contractName in this.contractsAssembly.contracts[this.contract]) {

                const pathr = path.join(__dirname, '../artifacts', contractName + '.json')
                const metadata = fs.readFileSync(pathr, 'UTF-8');
                const constructorArgs = []
                console.log('Deploying '+ contractName);
                console.log('--------------------------');
                console.log(metadata.abi)
                  if(metadata.evm.bytecode.object.length != 0){
               web3Service.sendContract(address,metadata.abi,metadata.evm.bytecode.object)
                    .then(newContractInstance => {
                        console.log(newContractInstance);
                    })
                    .catch(err => {
                        console.log(err);
                    })

            } else {
                console.log('>> [INFO] This contract ' + contractName + 'may be abstract, not implement an abstract parent\'s methods completely or not invoke an inherited contract\'s constructor correctly. ')
            }



            }
/*            const abi = this.contractsAssembly[contractName].abi;
            const bytecode = this.contractsAssembly[contractName].evm.bytecode.object;*/

          /*  if(bytecode.length != 0){
               web3Service.sendContract(address,abi,bytecode)
                    .then(newContractInstance => {
                        console.log(newContractInstance);
                    })
                    .catch(err => {
                        console.log(err);
                    })

            } else {
                console.log('>> [INFO] This contract ' + contractName + 'may be abstract, not implement an abstract parent\'s methods completely or not invoke an inherited contract\'s constructor correctly. ')
            }*/

            console.log('\n');
        }
}

module.exports = ContractServices;