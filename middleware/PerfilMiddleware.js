// Importa o modelo Perfil para validar dados no banco
const Perfil = require('../model/Perfil');

// Exporta a classe PerfilMiddleware
module.exports = class PerfilMiddleware {

    // Valida se o nome do perfil tem ao menos 3 caracteres
    async validar_NomePerfil(request, response, next) {
        const nomePerfil = request.body.perfil.nomePerfil;

        if (!nomePerfil || nomePerfil.trim().length < 3) {
            return response.status(400).send({
                status: false,
                msg: "O nome do perfil deve ter no mínimo 3 letras."
            });
        }

        next();
    }

    // Verifica se já existe um perfil com o mesmo nome
    async isNot_PerfilByNomePerfil(request, response, next) {
        const nomePerfil = request.body.perfil.nomePerfil;

        const objPerfil = new Perfil();
        objPerfil.nomePerfil = nomePerfil;

        const perfilExiste = await objPerfil.isPerfilByNomePerfil();

        if (perfilExiste) {
            return response.status(400).send({
                status: false,
                msg: "Já existe um perfil com este nome."
            });
        }

        next();
    }

    // Verifica se o ID do perfil existe no banco (para update/delete)
    async isPerfilById(request, response, next) {
        const idPerfil = request.body.idPerfil;

        const objPerfil = new Perfil();
        const existe = await objPerfil.isPerfilById(idPerfil);

        if (!existe) {
            return response.status(400).send({
                status: false,
                msg: "Perfil não encontrado pelo ID fornecido."
            });
        }

        next();
    }
};
