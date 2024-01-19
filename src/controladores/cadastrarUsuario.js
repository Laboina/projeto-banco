const pool = require("../bancoDeDados/conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: "Preencha todos os campos." });
        };

        const verificarUsuario = await pool.query("select * from usuarios where email = $1", [email]);


        if (verificarUsuario.rows.length > 0) {
            return res.status(400).json({ mensagem: "E-mail já cadastrado." })
        }

        const senhaCripto = await bcrypt.hash(senha, 10);

        const criarUsuario = "insert into usuarios(nome, email, senha) values($1, $2, $3)"
        const novoUsuario = await pool.query(criarUsuario, [nome, email, senhaCripto]);
        const usuarioCriado = await pool.query("select * from usuarios where email = $1", [email]);


        return res.status(201).json({
            "mensagem": {
                "id": usuarioCriado.rows[0].id,
                "nome": usuarioCriado.rows[0].nome,
                "email": usuarioCriado.rows[0].email
            }
        });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };

};

module.exports = cadastrarUsuario;  