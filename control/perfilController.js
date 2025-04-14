// Importa o modelo Perfil
const Perfil = require('../model/Perfil');

// Exporta a classe controladora de Perfil
module.exports = class PerfilController {

    // Método para criar um novo perfil
    async create(request, response) {
        // Cria uma nova instância do modelo Perfil
        const perfil = new Perfil();

        // Define os atributos do perfil com base nos dados enviados na requisição
        perfil.idFuncionarioPerfil = request.body.Perfil.idFuncionarioPerfil;
        perfil.idade = request.body.Perfil.idade;
        perfil.endereco = request.body.Perfil.endereco;
        perfil.telefone = request.body.Perfil.telefone;
        perfil.genero = request.body.Perfil.genero;
        perfil.estado_civil = request.body.Perfil.estado_civil;

        // Chama o método create() do modelo para salvar o novo perfil no banco
        const isCreated = await perfil.create();

        // Retorna a resposta com o resultado da operação
        response.status(200).send({
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Perfil criado com sucesso!' : 'Erro ao criar perfil'
        });
    }

    // Método para atualizar um perfil existente
    async update(request, response) {
        // Cria uma nova instância do modelo Perfil
        const perfil = new Perfil();

        // Define o ID do perfil a ser atualizado
        perfil.idPerfil = request.params.id;

        // Atualiza os atributos com base nos dados enviados na requisição
        perfil.idFuncionarioPerfil = request.body.Perfil.idFuncionarioPerfil;
        perfil.idade = request.body.Perfil.idade;
        perfil.endereco = request.body.Perfil.endereco;
        perfil.telefone = request.body.Perfil.telefone;
        perfil.genero = request.body.Perfil.genero;
        perfil.estado_civil = request.body.Perfil.estado_civil;

        // Chama o método update() do modelo
        const isUpdated = await perfil.update();

        // Retorna o status da atualização
        response.status(200).send({
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Perfil atualizado com sucesso!' : 'Erro ao atualizar perfil'
        });
    }

    // Método para deletar um perfil
    async delete(request, response) {
        // Cria uma nova instância do modelo Perfil
        const perfil = new Perfil();

        // Define o ID do perfil a ser excluído
        perfil.idPerfil = request.params.id;

        // Chama o método delete() do modelo
        const isDeleted = await perfil.delete();

        // Retorna a resposta com o status da exclusão
        response.status(200).send({
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Perfil excluído com sucesso!' : 'Erro ao excluir perfil'
        });
    }

    // Método para listar todos os perfis
    async readAll(request, response) {
        // Cria uma nova instância do modelo Perfil
        const perfil = new Perfil();

        // Chama o método readAll() para buscar todos os perfis no banco
        const resultado = await perfil.readAll();

        // Envia os dados encontrados na resposta
        response.status(200).send({
            cod: 1,
            status: true,
            msg: 'Consulta realizada com sucesso!',
            perfis: resultado
        });
    }

    // Método para buscar um perfil por ID
    async readByID(request, response) {
        // Cria uma nova instância do modelo Perfil
        const perfil = new Perfil();

        // Define o ID a ser buscado com base no parâmetro da URL
        perfil.idPerfil = request.params.id;

        // Chama o método readByID() do modelo
        const resultado = await perfil.readByID();

        // Envia a resposta com os dados do perfil encontrado (ou não)
        response.status(200).send({
            cod: 1,
            status: !!resultado,
            msg: resultado ? 'Perfil encontrado' : 'Perfil não encontrado',
            perfil: resultado
        });
    }
};
