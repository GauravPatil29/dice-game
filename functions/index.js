'use strict';
const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:vfFQAmd8L162kbNQ@cluster0.n0kho.mongodb.net/dice";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

(async function () {
    try {
        await client.connect();
        console.log("connected to database");
    } catch (error) {
        console.error(error);
    }
})()

app.post('/users', async (req, res) => {

    const user = req.body.user;

    try {

        const collection = client.db().collection("users");
        const cursor = await collection.findOne({
            username: user.username, nickname: user.nickname, password: user.password
        });

        if (cursor) {

            const result = Object.assign(cursor);

            res.status(200);
            res.send(result);
        } else {
            const result = Object.assign(user);
            result.role = "user";

            await collection.insertOne(result);

            res.status(201);
            res.send(result);
        }
    } catch (error) {

        res.status(500);
        res.send(error);
    }
});

app.get('/scores', async (req, res) => {

    try {

        const collection = client.db().collection("scores");
        const cursor = collection.find();

        if ((await cursor.count()) === 0) {

            res.status(200);
            res.send([]);
        } else {
            const scores = await cursor.toArray();

            res.status(200);
            res.send(scores);
        }
    } catch (error) {

        res.status(500);
        res.send(error);
    }
});

app.post('/scores', async (req, res) => {

    const score = req.body.score;

    try {

        const collection = client.db().collection("scores");
        await collection.insertOne(score);

        res.status(201);
        res.send();

    } catch (error) {
        res.status(500);
        res.send(error);
    }

});

app.use((req, res, next) => {
    res.status(404);
    res.type('txt').send('Not found');
});

app.listen(4201);

// exports.api = functions.https.onRequest(app);