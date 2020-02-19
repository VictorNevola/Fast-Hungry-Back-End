const sgMail = require('@sendgrid/mail');
console.log("API DO CARALHO", process.env.SENDGRID_API_KEY)

sgMail.setApiKey("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");

const sendEmail = (user)=> {
    console.log('email',user)
    let msg = {
        to: "victornevolapn@gmail.com",
        from: 'teste@gmail.com',
        subject: 'Seja bem vindo, voce fez login nome do restaurante.',
        text: 'Sua fome esta preste a acabar :)',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    return sgMail.send(msg);
    
}

module.exports = sendEmail;