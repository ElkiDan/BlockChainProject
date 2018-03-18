window.onload = function() {
    var myContractInstance;
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        var Web3 = require('web3');
        var web3 = new Web3(new Web3.providers.HttpProvider('')); //http provider
        var version = web3.version.api;
        var contractABI = []; //the contract abi from remix
        if (contractABI != '') {
            var MyContract = web3.eth.contract(contractABI);
            myContractInstance = MyContract.at("0x"); //the contract address
        } else {
            console.log("Error");
        }
    }
}

function setRandomNumbers() {
    var number = "number";
    var runNumber;
    for (var i = 1; i < 7; i++) {
        runNumber = number;
        runNumber += i;
        document.getElementById(runNumber).value =
            Math.floor(Math.random() * 37) + 1;
    }

}