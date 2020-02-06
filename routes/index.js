const express = require('express');
const router = express.Router();
const passport = require("passport");

// const {loginGmail} = require('../controllers/authentication');

router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    })
  );
  
// rota de retorno após autenticar no Google
router.get('/auth/google/callback',passport.authenticate('google'),(request, response) => {response.status(200);});
  
  // fluxo de logout
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.status(200);
});

module.exports={router}