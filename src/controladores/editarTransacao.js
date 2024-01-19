const pool = require("../bancoDeDados/conexao");

const editarTransacao = async (req, res) => {
    try {
        const idTransacao = req.params.id;
        const { descricao, valor, data, categoria_id, tipo } = req.body;

        if (!descricao || !valor || !data || !categoria_id || !tipo) {
            return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser informados" });
        }

        const transacaoAtualizada = await pool.query(
            "UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 WHERE id = $6 RETURNING *",
            [descricao, valor, data, categoria_id, tipo, idTransacao]
        );

        if (transacaoAtualizada.rows.length === 0) {
            return res.status(404).json({ mensagem: "Transação não encontrada." });
        }

        const { senha: _, ...transacaoDetalhada } = transacaoAtualizada.rows[0];

        return res.status(200).json({ transacao: transacaoDetalhada });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = editarTransacao;