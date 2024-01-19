const jwt = require("jsonwebtoken");
const senhaJwt = require("./senhaJwt");


const criacaoToken = async (id) => {

    try {
        const token = jwt.sign({ id }, senhaJwt, { expiresIn: "4h" });
        return token;

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}


module.exports = { criacaoToken };