const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.body.token;
  console.log(req.body)
    if(!token) {
      res.status(404).send('Access Denied')
    }
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      // req.user = verified;
      res.status(200).send('Acesso concedido');
    }
    catch (error) {
      console.log(error);
      res.status(400).send('Invalid Token');
    }
    
  }

module.exports = auth;