const pool = require("../bancoDeDados/conexao");

const excluirTransacao = async (req, res) => {
    const { id } = req.params;

    try {
        const reqId = req.usuario.id
        const { rows, rowCount } = await pool.query("select id, tipo, descricao, valor, data, usuario_id, categoria_id from transacoes where usuario_id = $1", [reqId]);

        if (rowCount < 1) {
            return res.status(404).json({ mensagem: "Transação não encontrada" });
        }

        await pool.query("delete from transacoes where id = $1", [id]);

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = excluirTransacao; 