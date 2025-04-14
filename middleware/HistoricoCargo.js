// Importa o modelo HistoricoCargo
const HistoricoCargo = require('../model/HistoricoCargo');

module.exports = class HistoricoCargoMiddleware {

    // Valida se os IDs de funcionário e cargo são válidos
    async validar_IDs(request, response, next) {
        const { idFuncionario, idCargo } = request.body.historicoCargo;

        if (!Number.isInteger(idFuncionario) || idFuncionario <= 0) {
            return response.status(400).send({
                status: false,
                msg: "ID de funcionário inválido."
            });
        }

        if (!Number.isInteger(idCargo) || idCargo <= 0) {
            return response.status(400).send({
                status: false,
                msg: "ID de cargo inválido."
            });
        }

        next();
    }

    // Verifica se o registro de histórico já existe para o mesmo funcionário e cargo na mesma data
    async isNot_HistoricoCargoDuplicado(request, response, next) {
        const { idFuncionario, idCargo, dataInicio } = request.body.historicoCargo;

        const objHistorico = new HistoricoCargo();
        objHistorico.idFuncionario = idFuncionario;
        objHistorico.idCargo = idCargo;
        objHistorico.dataInicio = dataInicio;

        const jaExiste = await objHistorico.isHistoricoExistente();

        if (jaExiste) {
            return response.status(400).send({
                status: false,
                msg: "Já existe um histórico de cargo com os mesmos dados."
            });
        }

        next();
    }
};
