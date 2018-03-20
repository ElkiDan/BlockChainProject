var amountOfPayment = 0.01; //global var
var myContractInstance;
var web3;
var numberOfParticipents = 2;
var commitment;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    var Web3 = require('web3');
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); //http provider
    var version = web3.version.api;
    var contractABI = JSON.parse('[]'); //Put here the abi
    if (contractABI != '') {
        var MyContract = web3.eth.contract(contractABI);
        myContractInstance = MyContract.at("0x"); //the contract address
    } else {
        console.log("Error");
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

function play() {
    var address = web3.eth.accounts[0];
    //check if its an address.
    var isAddress = web3.isAddress(address);
    if (isAddress) {
        function getBalance(address) {
            return new Promise(function(resolve, reject) {
                web3.eth.getBalance(address,
                    function(error, result) {
                        if (error) {
                            console.log("Error!");
                        } else {
                            resolve(result);
                        }
                    });
            });
        }

        getBalance(address).then((result) => {
            var balance = result.c[0] / 10000;
            alert("you got " + balance + " ether");

            if (balance >= amountOfPayment) {
                var array = [
                    document.getElementById("number1").value,
                    document.getElementById("number2").value,
                    document.getElementById("number3").value,
                    document.getElementById("number4").value,
                    document.getElementById("number5").value,
                    document.getElementById("number6").value
                ];

                //hash the commitment 
                commitment = document.getElementById("commitment").toString();
                var hashOfCommitment = web3.sha3(commitment);

                if (myContractInstance.PlaceNumbersAndCommitment(array, hashOfCommitment, address)) {
                    console.log("You are in the Game!");
                    web3.eth.register(address);
                    //TODO adding waiting gif
                } else {
                    console.log("You are not in the Game!");
                }

            } else {
                console.log("You are out of money!");
            }
        });
    } else {
        console.log("This is not an  address!");
    }
}