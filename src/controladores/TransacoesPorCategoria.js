const pool = require("../bancoDeDados/conexao");

const transacoesPorCategoria = async (req, res) => {
    try {
        const reqId = req.usuario.id;
        const categoriasFiltro = req.query.filtro;

        if (!categoriasFiltro || !Array.isArray(categoriasFiltro) || categoriasFiltro.length === 0) {
            return res.status(400).json({ mensagem: "O parâmetro de filtro deve ser um array contendo pelo menos uma categoria." });
        }

        const { rows: transacoes } = await pool.query(
            "SELECT id, tipo, descricao, valor, data, usuario_id, categoria_id FROM transacoes WHERE usuario_id = $1 AND categoria_id = ANY($2::int[])",
            [reqId, categoriasFiltro]
        );

        if (transacoes.length === 0) {
            return res.status(204).json([]);
        }

        return res.status(200).json(transacoes);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = transacoesPorCategoria;