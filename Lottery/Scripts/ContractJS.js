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
}

var conAbi = JSON.parse('Fill ABI');
var myContract = web3.eth.contract(conAbi);
var contractAddress = "fill address";
myContractInstance = myContract.at(contractAddress); //the contract address



function play() {
    document.getElementById("playBtn").disabled = true;
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
                //hash the commitment 
                commitment = document.getElementById("commitment").value;
                var hashOfCommitment = web3.sha3(commitment);
                var send = web3.eth.sendTransaction({ from: myAddress, to: myContractInstance, value: web3.toWei(0.01, "ether") });
                myContractInstance.addNewPlayer(hashOfCommitment, 10000000000000000, function (error, result) {
                                if (!(error)) {
                                    console.log(result);
                                    document.getElementById("loading").style.visibility = 'visible';
                                    console.log("You are in the game!");
                                }
                            });
                    }
                });
                
            } else {
                console.log("You are out of money!");
            }
    }

var AnnonceSentRandom = myContractInstance.AnnonceSentRandom();

AnnonceSentRandom.watch(function (error, result) {
    if (!error) {
        $("#loader").hide();
        document.getElementById("randomBtn").disabled = false;
        //TODO After few min??
        document.getElementById("checkIfLotteryCanStart").disabled = false;
        console.log("Now you can send your random!");
    } else {
        $("#loader").hide();
        console.log(error);
    }
});

function sendRandom() {
    document.getElementById("randomBtn").disabled = true;
    var address = web3.eth.accounts[0];
    var random = commitment;
    myContractInstance.submitRandomness(address, random, function (error, result) {
        if (!error) {
            console.log("OK, now wait please for the announce!");
        } else {
            console.log("You are out of the Game!");
        } 
     });
}

function checkIfLotteryCanStart() {
    myContractInstance.checkIfLotteryCanStart(function (error, result) {
    });
}