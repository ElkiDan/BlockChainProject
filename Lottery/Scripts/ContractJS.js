var amountOfPayment = 0.01; //global var
var myContractInstance;
var web3;
var numberOfParticipents = 2;
var randomNumber;
var address;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    var Web3 = require('web3');
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); //http provider
    var version = web3.version.api;
}

function getBalance(address) {
    return new Promise(function (resolve, reject) {
        web3.eth.getBalance(address,
            function (error, result) {
                if (error) {
                    console.log("Error!");
                } else {
                    resolve(result);
                }
            });
    });
}

var account = web3.eth.accounts[0];
if (account == null) {
    console.log("Not Connected");
    document.getElementById("logoutImg").style.visibility = "visible";
    document.getElementById("currentBalance").value = "You Are Not Connected";
} else {
    console.log("Connected");
    document.getElementById("loginImg").style.visibility = "visible";
    getBalance(account).then((result) => {
        var balance = result.c[0] / 10000;
        document.getElementById("currentBalance").value = balance.toString() + " ETHER";
    });

}
var accountInterval = setInterval(function () {
        if (web3.eth.accounts[0] !== account) {

            account = web3.eth.accounts[0];
            if (account != null) {
                console.log("Connected");
                document.getElementById("logoutImg").style.visibility = "hidden";
                document.getElementById("loginImg").style.visibility = "visible";
                getBalance(account).then((result) => {
                    var balance = result.c[0] / 10000;
                    document.getElementById("currentBalance").value = balance.toString() + " ETHER";
                });
            } else {
                console.log("Log Out");
                document.getElementById("logoutImg").style.visibility = "visible";
                document.getElementById("loginImg").style.visibility = "hidden";
                document.getElementById("currentBalance").value = "You Are Not Connected";
            }
        }
    },
    100);

var conAbi = JSON.parse('Fill ABI');
var myContract = web3.eth.contract(conAbi);
var contractAddress = "fill address";
myContractInstance = myContract.at(contractAddress); //the contract address


function play() {
    document.getElementById("playBtn").disabled = true;
    document.getElementById("playBtn").style.opacity = "0.6";

    address = web3.eth.accounts[0];
    //check if its an address.
    var isAddress = web3.isAddress(address);
    if (isAddress) {
        

        getBalance(address).then((result) => {
            var balance = result.c[0] / 10000;
            alert("you got " + balance + " ether");
            if (balance >= amountOfPayment) {
                //hash the random number 
                randomNumber = document.getElementById("randomNumber").value;
                var hashOfRandom = web3.sha3(randomNumber);
                var send = web3.eth.sendTransaction({
                    from: address,
                    to: contractAddress,
                    value: web3.toWei(0.01, "ether")
                });
                myContractInstance.addNewPlayer(hashOfRandom,
                    10000000000000000,
                    function(error, result) {
                        if (!(error)) {
                            //console.log(result);
                            document.getElementById("loading").style.visibility = 'visible';
                            console.log("You are in the game!");
                        }
                    });
            } else {
                console.log("You are out of money!");
            }
        });
    } else {
        console.log("This is not an address!");
    }
}

var AnnonceSentRandom = myContractInstance.AnnonceSentRandom();

AnnonceSentRandom.watch(function(error, result) {
    if (!error) {
        $("#loading").hide();
        document.getElementById("randomBtn").disabled = false;
        document.getElementById("randomBtn").style.opacity = "1";
        //TODO After few min??
        document.getElementById("checkIfLotteryCanStart").disabled = false;
        document.getElementById("checkIfLotteryCanStart").style.opacity = "1";
        console.log("Now you can send your random!");
    } else {
        $("#loading").hide();
        console.log(error);
    }
});

function sendRandom() {
    document.getElementById("randomBtn").disabled = true;
    document.getElementById("checkIfLotteryCanStart").style.opacity = "0.6";

    var random = randomNumber;
    myContractInstance.submitRandomness(address,
        random,
        function(error, result) {
            if (!error) {
                console.log("OK, now wait please for the announce!");
            } else {
                console.log("You are out of the Game!");
            }
        });
}

function checkIfLotteryCanStart() {
    myContractInstance.checkIfLotteryCanStart(
        function(error, result) {
            if (!error) {
                console.log("Trying");
            } else {
                console.log("failed!");
            }
        });
}