const Banco = require('./Banco');

class Departamento {
    constructor() {
        this._idDepartamento = null;
        this._nomeDepartamento = null;
        this._orcamento = null;
        this._localizacao = null;
        this._dataCriacao = null;
    }

    async create() {
        const conexao = Banco.getConexao();
        const SQL = `INSERT INTO departamentos (nomeDepartamento, orcamento, localizacao, dataCriacao) 
                     VALUES (?, ?, ?, ?);`;

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._nomeDepartamento,
                this._orcamento,
                this._localizacao,
                this._dataCriacao
            ]);
            this._idDepartamento = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar o departamento:', error);
            return false;
        }
    }

    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM departamentos WHERE idDepartamento = ?;';
        try {
            const [result] = await conexao.promise().execute(SQL, [this._idDepartamento]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o departamento:', error);
            return false;
        }
    }

    async update() {
        const conexao = Banco.getConexao();
        const SQL = `UPDATE departamentos 
                     SET nomeDepartamento = ?, orcamento = ?, localizacao = ?, dataCriacao = ?
                     WHERE idDepartamento = ?;`;

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._nomeDepartamento,
                this._orcamento,
                this._localizacao,
                this._dataCriacao,
                this._idDepartamento
            ]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o departamento:', error);
            return false;
        }
    }

    async isDepartamentoByNome(nome) {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT COUNT(*) AS qtd FROM departamentos WHERE nomeDepartamento = ?;';
        try {
            const [rows] = await conexao.promise().execute(SQL, [nome]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error('Erro ao verificar o nome do departamento:', error);
            return false;
        }
    }

    async isDepartamentoById(id) {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT COUNT(*) AS qtd FROM departamentos WHERE idDepartamento = ?;';
        try {
            const [rows] = await conexao.promise().execute(SQL, [id]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error('Erro ao verificar o ID do departamento:', error);
            return false;
        }
    }
    async isDepartamentoByNomeDepartamento() {
        const sql = `SELECT * FROM departamentos WHERE nomeDepartamento = ?`;
        const valores = [this.nomeDepartamento];
        try{
            const [rows] = await conexao.promise().execute(sql, valores);

            return rows.length > 0; // retorna true se já existir
        } catch (error) {
            console.error('Erro ao verificar o departamento pelo nome:', error);
            return false;
        }
    }
    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM departamentos ORDER BY nomeDepartamento;';
        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao listar departamentos:', error);
            return [];
        }
    }

    async readByID() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM departamentos WHERE idDepartamento = ?;';
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idDepartamento]);
            return rows;
        } catch (error) {
            console.error('Erro ao buscar departamento por ID:', error);
            return null;
        }
    }

    get idDepartamento() {
        return this._idDepartamento;
    }

    set idDepartamento(id) {
        this._idDepartamento = id;
        return this;
    }

    get nomeDepartamento() {
        return this._nomeDepartamento;
    }

    set nomeDepartamento(nome) {
        this._nomeDepartamento = nome;
        return this;
    }

    get orcamento() {
        return this._orcamento;
    }

    set orcamento(valor) {
        this._orcamento = valor;
        return this;
    }

    get localizacao() {
        return this._localizacao;
    }

    set localizacao(loc) {
        this._localizacao = loc;
        return this;
    }

    get dataCriacao() {
        return this._dataCriacao;
    }

    set dataCriacao(data) {
        this._dataCriacao = data;
        return this;
    }
}

module.exports = Departamento;
