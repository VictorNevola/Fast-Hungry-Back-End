const { UserModel } = require("../../models/user");
const bcrypt = require(`bcrypt`);
const bcryptSalt = 10;


const createUser = (request, response) => {

    const userObject = {
        name: request.body.name,
        email: request.body.email,
        picture: request.body.picture,
        password: request.body.password,
    };

    UserModel.findOne({ 'email': userObject.email })
        .then(user => {
            if (user) {
                response.send(user)
            }
            else {
                const salt = bcrypt.genSaltSync(bcryptSalt);
                const hashPass = bcrypt.hashSync(userObject.password, salt);
                UserModel.create({
                    name: userObject.name,
                    email: userObject.email,
                    picture: userObject.picture,
                    locale: userObject.locale,
                    authType: ["APLICATION"],
                    password: hashPass
                })
                    .then(user => {
                        response.send(user)
                    })
                    .catch(err => {
                        response.send(err)
                    })
            }
        })
        .catch(err => {
            console.log('Deu muito ruim', err)
        })
}

module.exports = createUser;