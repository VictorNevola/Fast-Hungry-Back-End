const express = require('express');
const router = express.Router();
const {gmailAuthPassport} = require("../resources/passport");
const sendEmail = require('../resources/email');
const {createUser, userAuthentication, updateUser} = require('../controllers/authentication/index');

router.use(gmailAuthPassport.initialize());

//rota para abrir aba autenticacao gmail
router.get("/auth/google",gmailAuthPassport.authenticate("google", 
    {scope: ["https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email"]})
);
// rota de retorno após autenticar no Google
router.get('/auth/google/callback',gmailAuthPassport.authenticate('google',
{scope: ["https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email"]}), 
  (request, response)=> {
    const user = request._passport.session.user;
    sendEmail(user)
    .then(sucess => {
      console.log(`############# iuhuuuhuhuhuhlllllll`, sucess)
      response.send(sucess)
    })
    .catch(err => {
        console.log('@@@@@@@@@@ -- error', err.response.body)
    })


    console.log('rota',user)
});
//rota para cadastro aplicação
router.get("/createUser/aplication", createUser);
//rota para authenticar usuario ja cadastrado
router.get("/user-authentication", userAuthentication);
//rota para inserir caso o usario seja cadastrado pelo gmail
router.get("/user-gmail/password-update-aplication", updateUser);
  
// fluxo de logout
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.status(200);
  console.log(`off`)
});

module.exports={router}