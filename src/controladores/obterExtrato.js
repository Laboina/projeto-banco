const pool = require("../bancoDeDados/conexao");

const obterExtrato = async (req, res) => {
    try {
        const reqId = req.usuario.id;

        const { rows, rowCount } = await pool.query("SELECT id, tipo, descricao, valor, data, usuario_id, categoria_id FROM transacoes WHERE usuario_id = $1", [reqId]);
        if (rowCount < 1) {
            return res.status(404).json({ mensagem: "Usuário não possui transações" });
        }

        let somaEntrada = 0;
        let somaSaida = 0;

        rows.map(transacao => {
            if (transacao.tipo === 'entrada') {
                somaEntrada += transacao.valor;
            } else if (transacao.tipo === 'saida') {
                somaSaida += transacao.valor;
            }
        });

        const resultado = {
            entrada: somaEntrada,
            saida: somaSaida
        };

        return res.status(200).json(resultado);
    } catch (error) {

        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = obterExtrato;
