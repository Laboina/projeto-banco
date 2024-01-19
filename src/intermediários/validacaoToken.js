const pool = require("../bancoDeDados/conexao");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../senhaJwt");


const validacaoToken = async (req, res, next) => {
    const { authorization } = req.headers;

    try {

        const token = authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ mensagem: "Para acessar este recurso, um token de autenticação válido deve ser enviado" });
        }

        const verificarToken = jwt.verify(token, senhaJwt);
        const { id } = verificarToken;

        const retornarUsuario = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);

        if (retornarUsuario.rows.length === 0) {
            return res.status(401).json({ mensagem: "Usuário inválido." });
        }

        req.usuario = retornarUsuario.rows[0];
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "Esse token está inválido" });
    }
};

module.exports = validacaoToken;