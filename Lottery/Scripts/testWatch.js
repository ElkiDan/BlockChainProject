$(document).ready(function() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    web3.eth.defaultAccount = web3.eth.accounts[0];

    var CoursetroContract = web3.eth.contract([
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_fName",
                    "type": "string"
                },
                {
                    "name": "_age",
                    "type": "uint256"
                }
            ],
            "name": "setInstructor",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getInstructor",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "age",
                    "type": "uint256"
                }
            ],
            "name": "Instructor",
            "type": "event"
        }
    ]);

    var Coursetro = CoursetroContract.at('0x398d18887544a027d1fc01aeb768d794e188181d');

    var instructorEvent = Coursetro.Instructor();

    instructorEvent.watch(function(error, result) {
        if (!error) {
            $("#loader").hide();
            console.log(result.args.name + ' (' + result.args.age + ' years old)');
        } else {
            $("#loader").hide();
            console.log(error);
        }
    });

    $("#testBtn").click(function() {
        $("#loader").show();
        Coursetro.setInstructor("daniel",
            18,
            function(err, result) {

            });
    });
});