import express from 'express';
import uuid from 'node-uuid';
import crypto from 'crypto';
import admin from 'firebase-admin';
import serviceAccount from './private/peerchat-e145d-firebase-adminsdk-b2upf-d0e552f7f4.json'
import secret from './private/secret.json'

let app = express();

// Initialize firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://peerchat-e145d.firebaseio.com"
});


app.get("/api/auth", (req, res) => {
    const ip = req.headers['cf-connecting-ip'] || req.ip;
    const uid = uuid.v1();

    admin.auth().createCustomToken(uid)
        .then(function(customToken) {
            // Send token back to client
            res.json({
                ip,
                uid,
                token: customToken
            })
        })
        .catch(function(error) {
            console.log("Firebase: error creating custom token ", error);
            res.status(500).send({ error: "internal server error." });
        });
});


app.get("/api/room", (req, res) => {
    const ip = req.headers['cf-connecting-ip'] || req.ip;
    const name = crypto.createHmac('md5', secret.key).update(ip).digest('hex');
    let response ={};
    response.name=name;
    res.json(response);
});


app.listen(8000, () => console.log('Example app listening on port 8000!'))