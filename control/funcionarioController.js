// Importa o modelo de Funcionario
const Funcionario = require('../model/Funcionario');
const MeuTokenJWT = require('../model/MeuTokenJWT')

// Exporta a classe FuncionarioController
module.exports = class FuncionarioController {

    async create(request, response) {
        const funcionario = new Funcionario();

        funcionario.nome = request.body.funcionario.nome;
        funcionario.email = request.body.funcionario.email;
        funcionario.cpf = request.body.funcionario.cpf;
        funcionario.cargo = request.body.funcionario.cargo;
        funcionario.salario = request.body.funcionario.salario;
        funcionario.dataContratacao = request.body.funcionario.dataContratacao;
        funcionario.idDepartamentoFuncionario = request.body.funcionario.idDepartamentoFuncionario;
        funcionario.idSupervisorFuncionario = request.body.funcionario.idSupervisorFuncionario;
        funcionario.senha = request.body.funcionario.senha;

        const isCreated = await funcionario.create();

        if (isCreated) {
            const funcionarioCriado = {
                idFuncionario: funcionario.idFuncionario, 
                email: funcionario.email,
                name: funcionario.nome,
                role: funcionario.cargo
            };
            const jwt = new MeuTokenJWT();
            const token = jwt.gerarToken(funcionarioCriado);

            response.status(201).send({
                cod: 1,
                status: true,
                msg: 'Funcionário criado com sucesso!',
                funcionario: funcionarioCriado,
                token: token
            });
        } else {
            response.status(400).send({
                cod: 0,
                status: false,
                msg: 'Erro ao criar funcionário'
            });
        }
    }


    // Método assíncrono para atualizar um funcionário existente
    async update(request, response) {
        const funcionario = new Funcionario();

        funcionario.idFuncionario = request.params.idFuncionario;
        funcionario.nome = request.body.funcionario.nome;
        funcionario.email = request.body.funcionario.email;
        funcionario.cpf = request.body.funcionario.cpf;
        funcionario.cargo = request.body.funcionario.cargo;
        funcionario.salario = request.body.funcionario.salario;
        funcionario.dataContratacao = request.body.funcionario.dataContratacao;
        funcionario.idDepartamentoFuncionario = request.body.funcionario.idDepartamentoFuncionario;
        funcionario.idSupervisorFuncionario = request.body.funcionario.idSupervisorFuncionario;
        //funcionario.senha = request.body.funcionario.senha;

        const isUpdated = await funcionario.update();

        response.status(200).send({
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Funcionário atualizado com sucesso!' : 'Erro ao atualizar funcionário'
        });
    }

    // Método assíncrono para excluir um funcionário
    async delete(request, response) {
        const funcionario = new Funcionario();

        funcionario.idFuncionario = request.params.idFuncionario;

        const isDeleted = await funcionario.delete();

        response.status(200).send({
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Funcionário excluído com sucesso!' : 'Erro ao excluir funcionário'
        });
    }

    // Método assíncrono para buscar todos os funcionários
    async readAll(request, response) {
        const funcionario = new Funcionario();

        const resultado = await funcionario.readAll();

        response.status(200).send({
            cod: 1,
            status: true,
            msg: 'Consulta realizada com sucesso!',
            funcionarios: resultado
        });
    }

    // Método assíncrono para buscar um funcionário pelo ID
    async readByID(request, response) {
        const funcionario = new Funcionario();

        funcionario.idFuncionario = request.params.idFuncionario;

        const resultado = await funcionario.readByID();

        response.status(200).send({
            cod: 1,
            status: resultado ? true : false,
            msg: resultado ? 'Funcionário encontrado' : 'Funcionário não encontrado',
            funcionario: resultado
        });
    }
}
