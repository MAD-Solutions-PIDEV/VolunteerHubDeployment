const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const smsCodeStore = {}; 
// Route for sending a validation code by SMS
router.post('/sendNotification', (req, res) => {

  client.messages.create({
    to: req.body.phone,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: `Thank you so much, ${req.body.username}! Your donation of ${req.body.amount} USD has been received. We are incredibly grateful! `
  }).then(() => {
    res.json({success: true});
    
  }).catch((error) => {
    console.log(error);
    res.json({success: false, error: error.message});
  });
});


// Route for validating a phone number with a validation code
router.post('/verify', (req, res) => {
    const { smsCode } = req.body;
    // retrieve the stored SMS code and compare with input
    if (smsCode === smsCodeStore['user-1']) {
      // code is valid, perform action here
      res.send('SMS code verified!');
    } else {
      res.send('Invalid SMS code!');
    }
  });




module.exports = router;
