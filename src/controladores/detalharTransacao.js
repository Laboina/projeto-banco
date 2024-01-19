const pool = require("../bancoDeDados/conexao");

const detalharTransacao = async (req, res) => {
    try {
        const idTransacao = req.params.id;

        const transacao = await pool.query("SELECT * FROM transacoes WHERE id = $1", [idTransacao]);

        if (transacao.rows.length === 0) {
            return res.status(404).json({ mensagem: "Transação não encontrada." });
        }

        const { senha: _, ...transacaoDetalhada } = transacao.rows[0];

        return res.status(200).json({ transacao: transacaoDetalhada });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = detalharTransacao;