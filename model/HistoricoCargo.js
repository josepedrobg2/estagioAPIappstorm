const Banco = require('./Banco');

class HistoricoCargo {
    constructor() {
        this._idHistoricoCargos = null;
        this._idFuncionarioCargos = null;
        this._cargoAnterior = null;
        this._novoCargo = null;
        this._dataAlteracao = null;
    }

    // Cria novo registro de histórico de cargo
    async create() {
        const conexao = Banco.getConexao();
        const SQL = `
            INSERT INTO historicocargos (idFuncionarioCargos, cargoAnterior, novoCargo, dataAlteracao)
            VALUES (?, ?, ?, ?);
        `;

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._idFuncionarioCargos,
                this._cargoAnterior,
                this._novoCargo,
                this._dataAlteracao
            ]);
            this._idHistoricoCargos = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar histórico de cargo:', error);
            return false;
        }
    }

    // Deleta um histórico de cargo pelo ID
    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM historicocargos WHERE idHistoricoCargos = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._idHistoricoCargos]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir histórico de cargo:', error);
            return false;
        }
    }

    // Atualiza os dados de um histórico
    async update() {
        const conexao = Banco.getConexao();
        const SQL = `
            UPDATE historicocargos 
            SET idFuncionarioCargos = ?, cargoAnterior = ?, novoCargo = ?, dataAlteracao = ?
            WHERE idHistoricoCargos = ?;
        `;

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._idFuncionarioCargos,
                this._cargoAnterior,
                this._novoCargo,
                this._dataAlteracao,
                this._idHistoricoCargos
            ]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar histórico de cargo:', error);
            return false;
        }
    }

    // Lista todos os registros
    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM historicocargos ORDER BY dataAlteracao DESC;';
        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao buscar histórico de cargos:', error);
            return [];
        }
    }

    // Lista os históricos de um funcionário específico
    async readByFuncionario() {
        const conexao = Banco.getConexao();
        const SQL = `
            SELECT * FROM historicocargos 
            WHERE idFuncionarioCargos = ? 
            ORDER BY dataAlteracao DESC;
        `;
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idFuncionarioCargos]);
            return rows;
        } catch (error) {
            console.error('Erro ao buscar histórico por funcionário:', error);
            return [];
        }
    }

    // Getters e Setters
    get idHistoricoCargos() {
        return this._idHistoricoCargos;
    }

    set idHistoricoCargos(id) {
        this._idHistoricoCargos = id;
        return this;
    }

    get idFuncionarioCargos() {
        return this._idFuncionarioCargos;
    }

    set idFuncionarioCargos(id) {
        this._idFuncionarioCargos = id;
        return this;
    }

    get cargoAnterior() {
        return this._cargoAnterior;
    }

    set cargoAnterior(cargo) {
        this._cargoAnterior = cargo;
        return this;
    }

    get novoCargo() {
        return this._novoCargo;
    }

    set novoCargo(cargo) {
        this._novoCargo = cargo;
        return this;
    }

    get dataAlteracao() {
        return this._dataAlteracao;
    }

    set dataAlteracao(data) {
        this._dataAlteracao = data;
        return this;
    }
}

module.exports = HistoricoCargo;
