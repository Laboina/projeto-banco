const pool = require("../bancoDeDados/conexao");

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {

        if (!descricao || !valor || !data || !categoria_id || !tipo) {
            return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser informados" });
        };

        const transacaoCadastrada = `
        insert into 
        transacoes(descricao, valor, data, categoria_id, tipo, usuario_id)
        values($1, $2, $3, $4, $5, $6) returning*
        `

        const transacaoUsuarioId = [descricao, valor, data, categoria_id, tipo, req.usuario.id];

        const { rows } = await pool.query(transacaoCadastrada, transacaoUsuarioId);

        return res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

module.exports = cadastrarTransacao; 