const Banco = require('./Banco');

class Perfil {
    constructor() {
        this._idPerfil = null;
        this._idFuncionarioPerfil = null;
        this._idade = null;
        this._endereco = null;
        this._telefone = null;
        this._genero = null;
        this._estado_civil = null;
    }

    async create() {
        const conexao = Banco.getConexao();
        const SQL = `
            INSERT INTO perfis (idFuncionarioPerfil, idade, endereco, telefone, genero, estado_civil)
            VALUES (?, ?, ?, ?, ?, ?);
        `;

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._idFuncionarioPerfil,
                this._idade,
                this._endereco,
                this._telefone,
                this._genero,
                this._estado_civil
            ]);
            this._idPerfil = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar perfil:', error);
            return false;
        }
    }

    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM perfis WHERE idPerfil = ?;';
        try {
            const [result] = await conexao.promise().execute(SQL, [this._idPerfil]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir perfil:', error);
            return false;
        }
    }

    async update() {
        const conexao = Banco.getConexao();
        const SQL = `
            UPDATE perfis 
            SET idade = ?, endereco = ?, telefone = ?, genero = ?, estado_civil = ?
            WHERE idPerfil = ?;
        `;

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._idade,
                this._endereco,
                this._telefone,
                this._genero,
                this._estado_civil,
                this._idPerfil
            ]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            return false;
        }
    }

    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM perfis;';
        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler perfis:', error);
            return [];
        }
    }

    async readByFuncionario() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM perfis WHERE idFuncionarioPerfil = ?;';
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idFuncionarioPerfil]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Erro ao buscar perfil do funcionário:', error);
            return null;
        }
    }
    // Verifica se existe um perfil com o ID fornecido
    async isPerfilById(idPerfil) {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM perfis WHERE idPerfil = ? LIMIT 1;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [idPerfil]);
            return rows.length > 0;
        } catch (error) {
            console.error('Erro ao verificar perfil por ID:', error);
            return false;
        }
    }

    get idPerfil() {
        return this._idPerfil;
    }

    set idPerfil(id) {
        this._idPerfil = id;
        return this;
    }

    get idFuncionarioPerfil() {
        return this._idFuncionarioPerfil;
    }

    set idFuncionarioPerfil(id) {
        this._idFuncionarioPerfil = id;
        return this;
    }

    get idade() {
        return this._idade;
    }

    set idade(valor) {
        this._idade = valor;
        return this;
    }

    get endereco() {
        return this._endereco;
    }

    set endereco(valor) {
        this._endereco = valor;
        return this;
    }

    get telefone() {
        return this._telefone;
    }

    set telefone(valor) {
        this._telefone = valor;
        return this;
    }

    get genero() {
        return this._genero;
    }

    set genero(valor) {
        this._genero = valor;
        return this;
    }

    get estado_civil() {
        return this._estado_civil;
    }

    set estado_civil(valor) {
        this._estado_civil = valor;
        return this;
    }
}

module.exports = Perfil;
