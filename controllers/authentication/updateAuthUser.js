const {UserModel} = require('../../models/user');
const bcrypt = require(`bcrypt`);
const bcryptSalt = 10;

const updateUser = (request, response) => {

    const userObject = {
        email: request.body.email,
        password: request.body.password,
    };

    UserModel.findOne({'email': userObject.email})
    .then((user)=> {
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(userObject.password, salt);
        console.log(user)
        UserModel.updateMany({"email": userObject.email}, {"$set": {password: hashPass}, "$push": {authType: "APLICATION"}}, {safe: true, upsert: true})
        .then((sucess)=> {
            response.status(200).json({message: "Senha cadastrada com sucesso :)", sucess})
        })
        .catch((err)=> {
            response.status(400).json({message: "Deu muito ruim", err})
        })
    })
    .catch((err)=>{
        response.status(401).json({message: "Usuario nao encontrado, verificar email digitado"});
    })
}

module.exports = updateUser;