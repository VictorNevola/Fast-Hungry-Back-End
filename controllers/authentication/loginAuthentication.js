const { UserModel } = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userAuthentication = (request, response) => {

    const userObject = {
        email: request.body.email,
        password: request.body.password,
    };

    UserModel.findOne({ 'email': userObject.email })
        .then((user) => {
            if (!user) {
                response.status(400).json({ message: "Usuario nao cadastrado ;_;" });
                return;
            }

            user.authType.map(auth => {
                if (auth === 'Google' && auth !== 'APLICATION') {
                    return response.status(426).json({ message: "Usuario fez login pelo Gmail, necessario cadastrar senha ou entrar novamente pelo gmail :)" });
                }
            })

            if (bcrypt.compareSync(userObject.password, user.password)) {
                const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET,  {expiresIn: 60*60*24});
                // response.header('auth', token).status(200).json({ message: "Usuario logado" });
                response.header('auth', token).status(200).send(token);
            } else {
                response.status(403).json({ message: "Senha incorreta" });
            }
        })
        .catch((err) => {
            console.log('Deu muito Ruim', err)
        })

}

const googleToken = (req, res) => {
    const userObject = {
        email: req.body.email,
        password: req.body.password,
    };

    UserModel.findOne({ 'email': userObject.email })
        .then((user) => {
            if (!user) {
                response.status(400).json({ message: "Usuario nao cadastrado ;_;" });
                return;
            }
        })
        .catch((err) => {
            console.log('Deu muito Ruim', err)
        })
}

module.exports = userAuthentication;