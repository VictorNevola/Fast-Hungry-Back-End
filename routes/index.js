const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { gmailAuthPassport } = require("../resources/passport");
const sendEmail = require('../resources/email');
const { createUser, userAuthentication, updateUser, socket, saveOrder,updateOrder, Payment, paid, findFood, auth, createCategory, listAllCategory, createProduct, listAllProduct, Payment2} = require('../controllers/index');




router.use(gmailAuthPassport.initialize());

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

//rota para abrir aba autenticacao gmail
router.get("/auth/google", gmailAuthPassport.authenticate("google",
  { scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"] })
);
// rota de retorno após autenticar no Google
router.get('/auth/google/callback', gmailAuthPassport.authenticate('google',
  { scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"] }),
  (request, response) => {
    const user = request._passport.session.user;
    sendEmail(user)
      .then(sucess => {
        // console.log(`############# iuhuuuhuhuhuhlllllll`, sucess)
        // response.send(sucess)
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET,  {expiresIn: '2d'});
        response.redirect(`${process.env.FRONT_URL}/category?id=${user._id}&auth=${token}`);
        // response.send('<script>window.close()</script>')
      })
      .catch(err => {
        // console.log('@@@@@@@@@@ -- error', err.response.body)
      })
  });
//rota para cadastro aplicação
router.post("/createUser/aplication", createUser);
//rota para authenticar usuario ja cadastrado
router.post("/user-authentication", userAuthentication);
//rota para inserir caso o usario seja cadastrado pelo gmail
router.get("/user-gmail/password-update-aplication", updateUser);
//rota para atualizar pedido
router.put("/update-order", updateOrder);
//rota para Pegas todas categorias
router.get('/AllCategory', listAllCategory);
//rota para inserir Categoria
router.post('/newCategory', createCategory);
//Rota para listar todos os produtos
router.post('/AllProducts', listAllProduct);
//Rota para inserir produtos
router.post('/newProduct', createProduct);

router.post("/payment", Payment);

router.post("/payment2", Payment2);

router.post("/paidorders", paid);

router.post("/findfood", findFood);

router.post ("/auth", auth);

// fluxo de logout
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.status(200);
  console.log(`off`)
});

module.exports = { router }