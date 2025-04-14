// Importa o módulo express para criação de APIs.
const express = require('express');

// Importa o modelo de Funcionário
const Funcionario = require('../model/Funcionario');

// Importa o módulo de geração de JWT
const MeuTokenJWT = require('../model/MeuTokenJWT');

// Exporta a classe responsável pelo controle de login
module.exports = class LoginController {

    // Método assíncrono para autenticação de login
    async login(request, response) {
        // Cria uma nova instância do modelo Funcionario
        const funcionario = new Funcionario();

        // Define os dados recebidos no corpo da requisição
        funcionario.email = request.body.funcionario.email;
        funcionario.senha = request.body.funcionario.senha;

        // Executa o login no modelo (verificação de credenciais)
        const logou = await funcionario.login();

        // Se o login for bem-sucedido
        if (logou === true) {

            // Define o payload com as informações que vão dentro do token JWT
            const payloadToken = {
                idFuncionario: funcionario.idFuncionario,
                nome: funcionario.nome,
                email: funcionario.email,
                cargo: funcionario.cargo
            };

            // Gera o token usando o modelo MeuTokenJWT
            const jwt = new MeuTokenJWT();
            const token_string = jwt.gerarToken(payloadToken);

            // Monta o objeto de resposta de sucesso
            const objResposta = {
                status: true,
                cod: 1,
                msg: 'Login realizado com sucesso!',
                funcionario: {
                    idFuncionario: funcionario.idFuncionario,
                    nome: funcionario.nome,
                    email: funcionario.email,
                    cpf: funcionario.cpf,
                    cargo: funcionario.cargo,
                    salario: funcionario.salario,
                    dataContratacao: funcionario.dataContratacao,
                    idDepartamentoFuncionario: funcionario.idDepartamentoFuncionario,
                    idSupervisorFuncionario: funcionario.idSupervisorFuncionario
                },
                token: token_string
            };

            // Retorna resposta com status 200
            return response.status(200).send(objResposta);

        } else {
            // Monta o objeto de resposta de erro
            const objResposta = {
                status: false,
                cod: 2,
                msg: 'Usuário ou senha inválidos'
            };

            // Retorna resposta com erro 401 (não autorizado)
            return response.status(401).send(objResposta);
        }
    }
};
