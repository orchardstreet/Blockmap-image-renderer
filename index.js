const {
    abi1,
    abi2,
    address1,
    address2,
    url
} = require('./blockchaincredentials.js');
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

syncDatabaseToBlockchainData();
