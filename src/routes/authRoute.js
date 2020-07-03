const express = require('express');
const config = require('./config');

const client = require('twilio')(config.accountSID , config.authToken);


const authRouter = express.Router();

function router(){


    authRouter.route('/login')
    .get((req , res) =>{
        client.verify
        .services(config.serviceID)
        .verifications.create({
            to: `+${req.query.phonenumber}`,
            channel: req.query.channel
        })
        .then((data)=>{
            res.status(200).send(data);
        })
    })
    
    authRouter.route('/verify')
    .get((req ,res)=>{
        client
        .verify
        .services(config.serviceID)
        .verificationChecks
        .create({
            to:`+${req.query.phonenumber}`,
            code:req.query.code
        })
        .then((data) =>{
            if(data.status === 'approved')
            {
                res.json(data.accountSid);
            }
            else
            {
                res.json("Failure");
            }
            
        })
    })
    



    return authRouter;
}
    
module.exports = router();