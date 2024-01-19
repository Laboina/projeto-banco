const pool = require("../bancoDeDados/conexao");

const editarPerfil = async (req, res) => {
    const { nome, email } = req.body;
    const idUsuario = req.usuario.id;

    try {

        const usuarioCadastrado = await pool.query("SELECT * FROM usuarios WHERE id = $1", [idUsuario]);

        if (usuarioCadastrado.rows.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }


        const atualizarPerfil = "UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3";
        await pool.query(atualizarPerfil, [nome, email, idUsuario]);

        const usuarioAtualizado = await pool.query("SELECT * FROM usuarios WHERE id = $1", [idUsuario]);
        const { senha: _, ...perfilAtualizado } = usuarioAtualizado.rows[0];

        return res.status(200).json({ mensagem: "Perfil atualizado com sucesso.", usuario: perfilAtualizado });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

module.exports = editarPerfil;