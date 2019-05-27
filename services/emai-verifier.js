const Verifier = require("email-verifier");

let verifier = new Verifier("https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_6yki4sbvWdEfP4Don22wi8Wot8WTQ&emailAddress=support@whoisxmlapi.com");
verifier.verify("r@rdegges.com", (err, data) => {
    if (err) throw err;
    console.log(data);
});

module.exports=verifier;