const { abi1, abi2, address1, address2, url } = require('./blockchaincredentials.js');
const dotenv = require('dotenv').config();
var Web3 = require('web3');
var web3 = new Web3(url);
var contract1 = new web3.eth.Contract(abi1, address1);
var contract2 = new web3.eth.Contract(abi2, address2);
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: process.env.DB_WAITCON,
    connectionLimit: process.env.DB_CONLIMIT,
    queueLimit: process.env.DB_QUEUELIMIT
});

function getRemoteTokenTransactionDataForId(tokenId) {
    return new Promise(function(resolve, reject) {
        contract2
            .getPastEvents('Painted', {
                filter: {
                    tokenId: web3.utils.toBN(tokenId)
                },
                fromBlock: 'earliest',
                toBlock: 'latest'
            })
            .then(async function(events) {
                if (events.length == 0) {
                    reject('No events found')
                } else {
                    resolve(events[0].returnValues)
                }
            })
    })
}

async function syncDatabaseToBlockchainData() {
    var latestMysqlID = 0;
    var latestBlockchainID = await contract1.methods.totalSupply().call();
    latestBlockchainID--;
    const connection1 = await pool.getConnection();
    await connection1.beginTransaction();
    try {
        console.log("\nConnected to database\n");
        var result1 = await connection1.query("select * from data where id=(select max(id) from data)");
        if (Object.values(result1[0])[0] == undefined) {
            latestMysqlID = -1;
        } else {
            latestMysqlID = Object.values(result1[0])[0].id;
        }
        console.log(latestMysqlID);
        console.log(latestBlockchainID);
        var i = latestMysqlID + 1;
        for (; i < latestBlockchainID + 1; i++) {
            var exists = await connection1.query("SELECT EXISTS(SELECT * FROM data WHERE id = " + i + ")");
            console.log(parseInt(Object.values(Object.values(exists[0])[0])));
            if (parseInt(Object.values(Object.values(exists[0])[0])) == 0) {
                var temp = await getRemoteTokenTransactionDataForId(i);
                temp = JSON.stringify(temp);
                console.log("inserting ID:  " + i + " into database");
                await connection1.query("insert into data (id,content) values (" + i + ",'" + temp + "')");
            }
        }
        await connection1.commit();
    } catch (err) {
        await connection1.rollback();
        throw err;
    } finally {
        await connection1.release();
        console.log("\nDatabase connection 1 is closed");
    }
}


async function getJavascriptObjectofID(IDD) {
    const connection2 = await pool.getConnection();
    await connection2.beginTransaction();
trying: try {
	var gotit = 0;
        console.log("\nConnected to database\n");
	IDD = parseInt(IDD);
	if (!isNaN(IDD) && IDD < 1000000000) {
        var result2 = await connection2.query("select * from data where id=" + IDD);
        if (await Object.values(result2[0])[0] == undefined) {
	    console.log("couldn't parse [0][0]");
            latestMysqlID = -1;
	    break trying;
        } else {
	    console.log("yes");
	    var result3 = Object.values(Object.values(result2[0])[0])[1].toString('utf-8');
	   // console.log("could parse [0][0], which is: " + typeof result2[1].keys()); 
	    gotit = 1;
            await connection2.commit();
        }
	}
    } catch (err) {
        await connection2.rollback();
        throw err;
    } finally {
        await connection2.release();
        console.log("\nDatabase connection 1 is closed");
	console.log("gotit: " + gotit);
	if (gotit == 1) {
	return result3;
	} else {
	console.log("Didn't get anything");
	return 0;
	}
    }
}
syncDatabaseToBlockchainData();

const WebSocket = require('ws');
const host = '127.0.0.1';
const port = 8082;
const socketServer = new WebSocket.Server({ host, port });
var userchosenID = 0;
socketServer.on('connection', (socketClient) => {
        console.log('connected');
        console.log('client Set length: ',socketServer.clients.size);
        socketClient.on("message", async function( data ) {
        console.log("Received data of length: " + data.length);
		console.log(typeof data);
		var reception = JSON.parse(data);
		var selection = reception["selection"];
		var IDnumber = reception["value"];
		console.log(selection);
		console.log(typeof IDnumber);
		IDnumber = parseInt(IDnumber);
		console.log(IDnumber);
	if (selection == "getsingleID" && IDnumber < 1000000000) {
		console.log("passed first if");
		if (!isNaN(IDnumber)) {
			console.log("passed second if");
        		var result = await getJavascriptObjectofID(IDnumber);
			console.log(result);
			if (result != "0") {
		        var replacement = '"response":"singleRawImageData",';
			var position = 1;
			var output = [result.slice(0,position),replacement,result.slice(position)].join('');
			socketClient.send(output);
			} else {
			var warningg = {response:"error",value:"Cannot find the image, probably out of range"};
        		socketClient.send(JSON.stringify(warningg));
			}
		}
	}
	});


        socketClient.on('close', (socketClient) => {
                console.log('closed');
                console.log('Number of clients: ', socketServer.clients.size);

        });

});
