const pool = require("../bancoDeDados/conexao");
const bcrypt = require("bcrypt");
const { criacaoToken } = require("../token");

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        if (!email || !senha) {
            return res.status(400).json({ mensagem: "Campos não preenchidos." });
        }

        const usuario = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

        if (usuario.rows.length === 0) {
            return res.status(401).json({ mensagem: "Usuário não encontrado." });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.rows[0].senha);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: "Senha incorreta." });
        }

        const id = usuario.rows[0].id;
        const token = await criacaoToken(id);
        const { senha: _, ...usuarioLogado } = usuario.rows[0];

        return res.status(200).json({ usuario: usuarioLogado, token });

    } catch (error) {

        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = loginUsuario;