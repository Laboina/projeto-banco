const express = require("express");

const cadastrarUsuario = require("./controladores/cadastrarUsuario");
const loginUsuario = require("./controladores/login");
const detalharUsuario = require("./controladores/detalharPerfil");
const validacaoToken = require("./intermediarios/validacaoToken");
const editarPerfil = require("./controladores/editarPerfil");
const detalharTransacao = require("./controladores/detalharTransacao");
const listarTransacoes = require("./controladores/listarTransacoes");
const listarCategoria = require("./controladores/listarCategoria");
const cadastrarTransacao = require("./controladores/cadastrarTransacao");
const excluirTransacao = require("./controladores/excluirTransacao");
const obterExtrato = require("./controladores/obterExtrato");
const editarTransacao = require("./controladores/editarTransacao");
const transacoesPorCategoria = require("./controladores/transacoesPorCategoria");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", loginUsuario);
rotas.get("/usuario", validacaoToken, detalharUsuario);
rotas.get("/categoria", validacaoToken, listarCategoria)
rotas.get("/transacao", validacaoToken, listarTransacoes);
rotas.put("/usuario", validacaoToken, editarPerfil);
rotas.get("/transacao/extrato", validacaoToken, obterExtrato);
rotas.get("/transacao/:id", validacaoToken, detalharTransacao);
rotas.post("/transacao", validacaoToken, cadastrarTransacao);
rotas.delete("/transacao/:id", validacaoToken, excluirTransacao);
rotas.put("/transacoes/:id", validacaoToken, editarTransacao);
rotas.get("/transacao", validacaoToken, transacoesPorCategoria);

module.exports = rotas; 