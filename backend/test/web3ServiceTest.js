const path = require('path');
const dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});

const chai  = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const web3Service = require("../service/Web3Service");



describe('Test create account', () => {
    it('Return a account whit address is a string', () => {
        expect(web3Service.createAccount().address).to.be.a('string');
    })
    it('Return a account whit privateKey is a string', () => {
        expect(web3Service.createAccount().privateKey).to.be.a('string');
    })
})

describe( 'Test get balance of account', () => {
    let address;
    let addressWithHugeAmount;
    let wrongAddress;

    // create a address to use in getbalance
    before(() => {
        address = web3Service.createAccount().address;
        addressWithHugeAmount = '0xC0edAc30f9Aaa76f2a0dD99c375C553d9B98d642';
        wrongAddress = '0xC0edAc30f9Aaa76f2a0dD99c375C553d9B98d64';

    })
    it('the balance should be a number', () => {
        return web3Service.getBalanceOf(address)
            .then(balance => {
                expect(balance).to.be.a('number');
            })
    })
    it( 'the balance should be positive', () => {
        return web3Service.getBalanceOf(addressWithHugeAmount)
            .then(balance => {
                assert.isAbove(balance,0);
            })
    })
    it('using a wrong address to get balance ', () => {
        try {
            web3Service.getBalanceOf(wrongAddress)
        } catch (err) {
            expect(err).to.be.a('Error');
        }
    })

})

describe( 'Test transactions of a account', () => {
    let toAddress;
    let amountToSend;
    let highAmountToSend;
    let fromAddress;

    before(() => {
        toAddress = '0xA206bd3f426c659590A37a4eD923A8DAe7A6789C';
        fromAddress = '0x0E6E33d7CbCe9363B0F0524C14580789f42d5BB9';
        amountToSend = 75.66;
    })
    it('send a amount return a transactionHash ', () => {
        web3Service.send(fromAddress,toAddress,amountToSend)
            .then(transaction => {
                expect(transaction.transactionHash).to.be.a('string');
            })
    })
    before(() => {
        //Volvemos a dejar la addres en el mismo saldo
        web3Service.send(toAddress,fromAddress,amountToSend);
        highAmountToSend = 120;
    })
    it('insufficient balance', () => {
        try{
            web3Service.send(web3Service.send(fromAddress,toAddress,highAmountToSend));
        } catch (err) {
            expect(err).to.be.a('Error');
        }
    })

})