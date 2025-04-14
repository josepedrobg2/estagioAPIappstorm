// Importa o modelo Departamento para validar os dados
const Departamento = require('../model/Departamento');

// Exporta a classe DepartamentoMiddleware com métodos de validação
module.exports = class DepartamentoMiddleware {

    // Valida se o nome do departamento tem pelo menos 3 caracteres
    async validar_NomeDepartamento(request, response, next) {
        const nomeDepartamento = request.body.Departamento.nomeDepartamento;

        if (nomeDepartamento.length < 3) {
            const objResposta = {
                status: false,
                msg: "O nome do departamento deve ter mais de 3 letras"
            }
            response.status(400).send(objResposta);
        } else {
            next(); // prossegue
        }
    }


    // Verifica se já existe um departamento com o mesmo nome
    async isNot_departamentoByNomeDepartamento(request, response, next) {
        const nomeDepartamento = request.body.Departamento.nomeDepartamento;

        const objDepartamento = new Departamento();
        objDepartamento.nomeDepartamento = nomeDepartamento;

        const departamentoExiste = await objDepartamento.isDepartamentoByNomeDepartamento();

        if (!departamentoExiste) {
            next(); // pode seguir
        } else {
            const objResposta = {
                status: false,
                msg: "Já existe um departamento com esse nome"
            }
            response.status(400).send(objResposta);
        }
    }

    // Verifica se um departamento existe a partir do ID informado
    async isDepartamentoById(request, response, next) {
        const idDepartamento = request.body.idDepartamento;

        const objDepartamento = new Departamento();

        const existe = await objDepartamento.isDepartamentoById(idDepartamento);

        if (existe) {
            next(); // tudo certo
        } else {
            const objResposta = {
                status: false,
                msg: "Departamento não encontrado"
            }
            response.status(400).send(objResposta);
        }
    }
}
