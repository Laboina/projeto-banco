const pool = require("../bancoDeDados/conexao")

const detalharUsuario = async (req, res) => {
    try {
        const id = req.usuario.id;
        const buscarUsuario = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);

        if (buscarUsuario.rows.length === 0) {
            return res.status(401).json({ mensagem: "Usuário não encontrado." });
        }

        const { senha: _, ...loginUsuario } = buscarUsuario.rows[0];

        return res.status(200).json({ mensagem: loginUsuario });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = detalharUsuario; 
