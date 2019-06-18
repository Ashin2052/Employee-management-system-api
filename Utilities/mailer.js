var nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: "mahat.ashin@hotmail.com",
        pass: "20520521asm"
    },
    tls: {
        rejectUnauthorized: false
    }
})


module.exports = {
    sendMail(from, to, subject,html) {
        console.log("send mail")
        return new Promise((resolve, reject) => {
            transport.sendMail({ from, to, subject, html }, (err, done) => {
                if (err) {
                    console.log(err,"err")
                         }
                else {
console.log(done,"done") 
                    }
            })
        })
    }
}