// Importa o modelo HistoricoCargo
const HistoricoCargo = require('../model/HistoricoCargo');

// Exporta a classe controladora de histórico de cargos
module.exports = class HistoricoCargoController {

    // Método para criar um novo registro de histórico de cargo
    async create(request, response) {
        // Cria uma nova instância do modelo HistoricoCargo
        const historico = new HistoricoCargo();

        // Define os dados do novo histórico de cargo com base nas informações da requisição
        historico.idFuncionario = request.body.HistoricoCargo.idFuncionario;
        historico.cargoAnterior = request.body.HistoricoCargo.cargoAnterior;
        historico.novoCargo = request.body.HistoricoCargo.novoCargo;
        historico.dataMudanca = request.body.HistoricoCargo.dataMudanca;
        historico.motivo = request.body.HistoricoCargo.motivo;

        // Chama o método create() do modelo para salvar o histórico no banco de dados
        const isCreated = await historico.create();

        // Envia a resposta para o cliente com status e mensagem apropriados
        response.status(200).send({
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Histórico de cargo criado com sucesso!' : 'Erro ao criar histórico de cargo'
        });
    }

    // Método para atualizar um histórico de cargo existente
    async update(request, response) {
        // Cria uma nova instância do modelo HistoricoCargo
        const historico = new HistoricoCargo();

        // Define o ID do histórico a ser atualizado
        historico.idHistoricoCargos = request.params.id;

        // Define os novos valores do histórico de cargo com base no corpo da requisição
        historico.idFuncionario = request.body.HistoricoCargo.idFuncionario;
        historico.cargoAnterior = request.body.HistoricoCargo.cargoAnterior;
        historico.novoCargo = request.body.HistoricoCargo.novoCargo;
        historico.dataMudanca = request.body.HistoricoCargo.dataMudanca;
        historico.motivo = request.body.HistoricoCargo.motivo;

        // Chama o método update() do modelo para atualizar o registro
        const isUpdated = await historico.update();

        // Envia a resposta com status e mensagem
        response.status(200).send({
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Histórico de cargo atualizado com sucesso!' : 'Erro ao atualizar histórico de cargo'
        });
    }

    // Método para excluir um histórico de cargo
    async delete(request, response) {
        // Cria uma instância do modelo
        const historico = new HistoricoCargo();

        // Define o ID do registro a ser excluído com base nos parâmetros
        historico.idHistoricoCargos = request.params.id;

        // Chama o método delete() do modelo
        const isDeleted = await historico.delete();

        // Envia resposta com o status da operação
        response.status(200).send({
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Histórico de cargo excluído com sucesso!' : 'Erro ao excluir histórico de cargo'
        });
    }

    // Método para listar todos os históricos de cargos
    async readAll(request, response) {
        // Cria uma instância do modelo
        const historico = new HistoricoCargo();

        // Busca todos os registros no banco
        const resultado = await historico.readAll();

        // Envia resposta com os dados obtidos
        response.status(200).send({
            cod: 1,
            status: true,
            msg: 'Consulta realizada com sucesso!',
            historicos: resultado
        });
    }

    // Método para buscar um histórico por ID
    async readByID(request, response) {
        // Cria uma instância do modelo
        const historico = new HistoricoCargo();

        // Define o ID com base nos parâmetros
        historico.idHistoricoCargos = request.params.id;

        // Busca o registro específico
        const resultado = await historico.readByID();

        // Envia resposta com o resultado encontrado ou não
        response.status(200).send({
            cod: 1,
            status: !!resultado,
            msg: resultado ? 'Histórico encontrado' : 'Histórico não encontrado',
            historico: resultado
        });
    }
};
