// Initializing required files and dependencies
const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); 

// Initializing Database, Schema,and Hidden Keys
const settings = require('./settings.json');
const TransactionModel = require('./models/Transactions');
const UsersModel = require('./models/Users');
const UserTransModel = require('./models/UserTrans');
mongoose.connect(`mongodb+srv://${settings.Username}:${settings.Password}@ethereumtaxstack.bngau.mongodb.net/EthereumTaxStack?retryWrites=true&w=majority`);

// Backend APIs and Functions

/**
 * Essential Functions and APIs Needed:
 * New User (POST Request to Mongo)
 * Collect User Data (GET Request from EtherScan API & POST Request to Mongo)
 * Display Data (GET Request fom Mongo)
 * Generate Tax Forms (More research needed for this)
 */


app.post('/addUser', async (req, res) => {
    const user = req.body;
    const newUser = new UsersModel(user);
    await newUser.save();

    res.json(user); 
});


app.get('/getTransactions', (req, res) => {
    TransactionModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.get('/getEtherBalance/:address', async (req, res) => {
    const userAddress = req.params.address;
    console.log(userAddress);
    const api_url = `https://api.etherscan.io/api?module=account&action=balance&address=${userAddress}&tag=latest&apikey=${settings.etherscanKey}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    res.json(json);
});

app.listen(3001, () => {
    console.log('server runs');
});