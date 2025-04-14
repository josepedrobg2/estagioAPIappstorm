// Importa o modelo Departamento
const Departamento = require('../model/Departamento');

// Exporta a classe controladora de departamentos
module.exports = class DepartamentoController {

    // Método para criar um novo departamento
    async create(request, response) {
        // Cria uma nova instância do modelo Departamento
        const departamento = new Departamento();

        // Define os dados do novo departamento com base nas informações recebidas na requisição
        departamento.nomeDepartamento = request.body.Departamento.nomeDepartamento;
        departamento.orcamento = request.body.Departamento.orcamento;
        departamento.localizacao = request.body.Departamento.localizacao;
        departamento.dataCriacao = request.body.Departamento.dataCriacao;

        // Chama o método create() do modelo para salvar o departamento no banco de dados
        const isCreated = await departamento.create();

        // Envia a resposta para o cliente com status e mensagem apropriados
        response.status(200).send({
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Departamento criado com sucesso!' : 'Erro ao criar departamento'
        });
    }

    // Método para atualizar um departamento existente
    async update(request, response) {
        // Cria uma nova instância do modelo Departamento
        const departamento = new Departamento();

        // Define o ID do departamento que será atualizado com base nos parâmetros da URL
        departamento.idDepartamento = request.params.id;

        // Define os novos valores do departamento com base no corpo da requisição
        departamento.nomeDepartamento = request.body.Departamento.nomeDepartamento;
        departamento.orcamento = request.body.Departamento.orcamento;
        departamento.localizacao = request.body.Departamento.localizacao;
        departamento.dataCriacao = request.body.Departamento.dataCriacao;

        // Chama o método update() do modelo para atualizar o registro no banco de dados
        const isUpdated = await departamento.update();

        // Envia a resposta para o cliente com status e mensagem apropriados
        response.status(200).send({
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Departamento atualizado com sucesso!' : 'Erro ao atualizar departamento'
        });
    }

    // Método para deletar um departamento
    async delete(request, response) {
        // Cria uma nova instância do modelo Departamento
        const departamento = new Departamento();

        // Define o ID do departamento a ser deletado com base nos parâmetros da URL
        departamento.idDepartamento = request.params.id;

        // Chama o método delete() do modelo para excluir o departamento do banco de dados
        const isDeleted = await departamento.delete();

        // Envia a resposta para o cliente com status e mensagem apropriados
        response.status(200).send({
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Departamento excluído com sucesso!' : 'Erro ao excluir departamento'
        });
    }

    // Método para buscar todos os departamentos cadastrados
    async readAll(request, response) {
        // Cria uma nova instância do modelo Departamento
        const departamento = new Departamento();

        // Chama o método readAll() para obter todos os departamentos do banco de dados
        const resultado = await departamento.readAll();

        // Envia os dados encontrados com uma mensagem de sucesso
        response.status(200).send({
            cod: 1,
            status: true,
            msg: 'Consulta realizada com sucesso!',
            departamentos: resultado
        });
    }

    // Método para buscar um departamento específico pelo ID
    async readByID(request, response) {
        // Cria uma nova instância do modelo Departamento
        const departamento = new Departamento();

        // Define o ID do departamento a ser buscado com base nos parâmetros da URL
        departamento.idDepartamento = request.params.id;

        // Chama o método readByID() do modelo para buscar o departamento no banco de dados
        const resultado = await departamento.readByID();

        // Envia a resposta com o resultado encontrado ou uma mensagem de erro caso não exista
        response.status(200).send({
            cod: 1,
            status: !!resultado,
            msg: resultado ? 'Departamento encontrado' : 'Departamento não encontrado',
            departamento: resultado
        });
    }
};
