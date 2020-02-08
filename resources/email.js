const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (user)=> {
    // console.log('email',user)
    let msg = {
        to: "victornevolapn@gmail.com",
        from: 'victornevolapn@gmail.com',
        subject: `Seja bem vindo, voce fez login nome do restaurante.`,
        text: 'Sua fome esta preste a acabar :)',
        html: '😞 ==> 😟 ==> 😋 ==> 💤 ==> 💩',
    };
    const response = await sgMail.send(msg);

    return response;

    // console.log(sgMail.send(msg))   
}

module.exports = sendEmail;