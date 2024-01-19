const pool = require("../bancoDeDados/conexao");

const listarTransacoes = async (req, res) => {

    try {
        const reqId = req.usuario.id
        const { rows: transacoes } = await pool.query("select id, tipo, descricao, valor, data, usuario_id, categoria_id from transacoes where usuario_id = $1", [reqId]);

        if (transacoes.rowCount < 1) {
            return res.status(404).json({ mensagem: "transação não encontrada" });
        };

        return res.status(200).json(transacoes);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

module.exports = listarTransacoes; 