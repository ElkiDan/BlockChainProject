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

function setRandomNumbers() {
    var number = "number";
    var runNumber;
    for (var i = 1; i < 5; i++) {
        runNumber = number;
        runNumber += i;
        document.getElementById(runNumber).value =
            Math.floor(Math.random() * 9) + 1;
    }
}

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
                var array = [
                    document.getElementById("number1").value,
                    document.getElementById("number2").value,
                    document.getElementById("number3").value,
                    document.getElementById("number4").value
                ];

                //hash the commitment 
                commitment = document.getElementById("commitment").value;
                var hashOfCommitment = web3.sha3(commitment);
                var conAbi = JSON.parse('[\r\n\t{\r\n\t\t"constant": false,\r\n\t\t"inputs": [\r\n\t\t\t{\r\n\t\t\t\t"name": "firstArray",\r\n\t\t\t\t"type": "uint256[]"\r\n\t\t\t},\r\n\t\t\t{\r\n\t\t\t\t"name": "secondArray",\r\n\t\t\t\t"type": "uint256[]"\r\n\t\t\t}\r\n\t\t],\r\n\t\t"name": "CompareArrays",\r\n\t\t"outputs": [\r\n\t\t\t{\r\n\t\t\t\t"name": "",\r\n\t\t\t\t"type": "bool"\r\n\t\t\t}\r\n\t\t],\r\n\t\t"payable": false,\r\n\t\t"stateMutability": "nonpayable",\r\n\t\t"type": "function"\r\n\t},\r\n\t{\r\n\t\t"constant": false,\r\n\t\t"inputs": [],\r\n\t\t"name": "Announce",\r\n\t\t"outputs": [\r\n\t\t\t{\r\n\t\t\t\t"name": "",\r\n\t\t\t\t"type": "string"\r\n\t\t\t}\r\n\t\t],\r\n\t\t"payable": false,\r\n\t\t"stateMutability": "nonpayable",\r\n\t\t"type": "function"\r\n\t},\r\n\t{\r\n\t\t"constant": false,\r\n\t\t"inputs": [\r\n\t\t\t{\r\n\t\t\t\t"name": "add",\r\n\t\t\t\t"type": "address"\r\n\t\t\t},\r\n\t\t\t{\r\n\t\t\t\t"name": "numbers",\r\n\t\t\t\t"type": "uint256[]"\r\n\t\t\t},\r\n\t\t\t{\r\n\t\t\t\t"name": "hashedRandom",\r\n\t\t\t\t"type": "bytes32"\r\n\t\t\t},\r\n\t\t\t{\r\n\t\t\t\t"name": "amountOfEther",\r\n\t\t\t\t"type": "uint256"\r\n\t\t\t}\r\n\t\t],\r\n\t\t"name": "PlaceNumbersAndCommitment",\r\n\t\t"outputs": [],\r\n\t\t"payable": false,\r\n\t\t"stateMutability": "nonpayable",\r\n\t\t"type": "function"\r\n\t},\r\n\t{\r\n\t\t"constant": true,\r\n\t\t"inputs": [],\r\n\t\t"name": "GetAvailablePlayersAmount",\r\n\t\t"outputs": [\r\n\t\t\t{\r\n\t\t\t\t"name": "",\r\n\t\t\t\t"type": "uint256"\r\n\t\t\t}\r\n\t\t],\r\n\t\t"payable": false,\r\n\t\t"stateMutability": "view",\r\n\t\t"type": "function"\r\n\t},\r\n\t{\r\n\t\t"constant": true,\r\n\t\t"inputs": [],\r\n\t\t"name": "owner",\r\n\t\t"outputs": [\r\n\t\t\t{\r\n\t\t\t\t"name": "",\r\n\t\t\t\t"type": "address"\r\n\t\t\t}\r\n\t\t],\r\n\t\t"payable": false,\r\n\t\t"stateMutability": "view",\r\n\t\t"type": "function"\r\n\t},\r\n\t{\r\n\t\t"constant": false,\r\n\t\t"inputs": [],\r\n\t\t"name": "GenerateRandomNumbers",\r\n\t\t"outputs": [],\r\n\t\t"payable": false,\r\n\t\t"stateMutability": "nonpayable",\r\n\t\t"type": "function"\r\n\t},\r\n\t{\r\n\t\t"constant": false,\r\n\t\t"inputs": [\r\n\t\t\t{\r\n\t\t\t\t"name": "add",\r\n\t\t\t\t"type": "address"\r\n\t\t\t},\r\n\t\t\t{\r\n\t\t\t\t"name": "random",\r\n\t\t\t\t"type": "string"\r\n\t\t\t}\r\n\t\t],\r\n\t\t"name": "CheckCommitment",\r\n\t\t"outputs": [\r\n\t\t\t{\r\n\t\t\t\t"name": "",\r\n\t\t\t\t"type": "bool"\r\n\t\t\t}\r\n\t\t],\r\n\t\t"payable": false,\r\n\t\t"stateMutability": "nonpayable",\r\n\t\t"type": "function"\r\n\t},\r\n\t{\r\n\t\t"constant": false,\r\n\t\t"inputs": [\r\n\t\t\t{\r\n\t\t\t\t"name": "add",\r\n\t\t\t\t"type": "address"\r\n\t\t\t}\r\n\t\t],\r\n\t\t"name": "AddVerifyPlayer",\r\n\t\t"outputs": [],\r\n\t\t"payable": false,\r\n\t\t"stateMutability": "nonpayable",\r\n\t\t"type": "function"\r\n\t},\r\n\t{\r\n\t\t"constant": false,\r\n\t\t"inputs": [],\r\n\t\t"name": "GiveMeMyMoney",\r\n\t\t"outputs": [\r\n\t\t\t{\r\n\t\t\t\t"name": "success",\r\n\t\t\t\t"type": "bool"\r\n\t\t\t}\r\n\t\t],\r\n\t\t"payable": true,\r\n\t\t"stateMutability": "payable",\r\n\t\t"type": "function"\r\n\t},\r\n\t{\r\n\t\t"inputs": [],\r\n\t\t"payable": false,\r\n\t\t"stateMutability": "nonpayable",\r\n\t\t"type": "constructor"\r\n\t}\r\n]');
                var myContract = web3.eth.contract(conAbi);
                myContractInstance = myContract.at("0xd4a775b125cfb12360edc08b2457e6ffd9419d67"); //the contract address
                myContractInstance.getAvailablePlayersAmount.call(function (err, result) {
                    if (result.c[0] > 0) {
                        myContractInstance.addNewPlayer(hashOfCommitment, amountOfPayment,
                            function(error, result) {
                                if (!error) {
                                    //console.log(result);
                                    $("#loading").show();
                                    console.log("You are in the game!");
                                    var sentRandomEvent = myContractInstance.AnnonceSentRandom();

                                    sentRandomEvent.watch(function (error, result) {
                                        if (!error) {
                                            document.getElementById("randomBtn").disabled = false;
                                            document.getElementById("checkForStartBtn").disabled = false;
                                            console.log("OK, Now you have 30 min to sent your randomness! and you can check if lottery can start and have a BONUS!");
                                        } else {
                                            $("#loader").hide();
                                            console.log(error);
                                        }
                                    });

                                    
                                }
                            });
                    }
                });
                    
            } else {
                console.log("You are out of money!");
            }
        });
    } else {
        console.log("This is not an  address!");
    }
}

function sendRandom() {
    document.getElementById("randomBtn").disabled = true;
    
    var random = commitment;
    myContractInstance.checkRandomness.call(random,
        function (error, result) {
            if (result) {
                myContractInstance.submitRandomness(random, function (err, res) { });
                console.log("OK, now wait please for the announce!");
            } else {
                console.log("This is not your random, you are out of the game!");
            }
        });
}

function checkIfLotteryCanStart() {
    myContractInstance.checkIfLotteryCanStart(
        function (error, result) {
            if (!error) {
                console.log("Trying");
            } else {
                console.log("failed!");
            }
        });
}