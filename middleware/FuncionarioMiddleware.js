// Importa o modelo Funcionario para verificar dados no banco de dados.
const Funcionario = require('../model/Funcionario');

// Exporta a classe FuncionarioMiddleware
module.exports = class FuncionarioMiddleware {

    // Valida se o nome do funcionário tem ao menos 3 caracteres
    async validar_NomeFuncionario(request, response, next) {
        const nome = request.body.funcionario.nome;

        if (!nome || nome.length < 3) {
            return response.status(400).send({
                status: false,
                msg: "O nome deve ter no mínimo 3 letras."
            });
        }

        next();
    }

    // Verifica se o email tem formato válido
    async validar_EmailFuncionario(request, response, next) {
        const email = request.body.funcionario.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            return response.status(400).send({
                status: false,
                msg: "Email inválido."
            });
        }

        next();
    }

    // Verifica se o email já está cadastrado
    async isNot_funcionarioByEmail(request, response, next) {
        const email = request.body.funcionario.email;

        const objFuncionario = new Funcionario();
        objFuncionario.email = email;

        const emailExiste = await objFuncionario.isFuncionarioByEmail(email);

        if (emailExiste) {
            return response.status(400).send({
                status: false,
                msg: "Já existe um funcionário com este email."
            });
        }

        next();
    }

    // Verifica se o CPF tem 11 dígitos numéricos
    async validar_CPF(request, response, next) {
        const cpf = request.body.funcionario.cpf;

        const cpfLimpo = cpf.replace(/\D/g, '');

        if (!cpf || cpfLimpo.length !== 11 || !/^\d+$/.test(cpfLimpo)) {
            return response.status(400).send({
                status: false,
                msg: "CPF inválido. Deve conter 11 dígitos numéricos."
            });
        }

        next();
    }
};
