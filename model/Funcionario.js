const Banco = require('./Banco');
const Departamento = require('./Departamento');
const HistoricoCargo = require('./HistoricoCargo');
const Perfil = require('./Perfil');

class Funcionario {
    constructor() {
        this._idFuncionario = null;
        this._nome = null;
        this._email = null;
        this._cpf = null;
        this._cargo = null;
        this._salario = null;
        this._dataContratacao = null;
        this._idDepartamentoFuncionario = null;
        this._idSupervisorFuncionario = null;
        this._senha = null; // 🔐 Adicionado
    }

    async create() {
        const conexao = Banco.getConexao();
        const SQL = `
            INSERT INTO funcionarios (nome, email, cpf, cargo, salario, dataContratacao, idDepartamentoFuncionario, idSupervisorFuncionario, senha) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, MD5(?));
        `;

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._nome,
                this._email,
                this._cpf,
                this._cargo,
                this._salario,
                this._dataContratacao,
                this._idDepartamentoFuncionario,
                this._idSupervisorFuncionario,
                this._senha
            ]);
            this._idFuncionario = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar funcionário:', error);
            return false;
        }
    }

    async update() {
        const conexao = Banco.getConexao();
        const SQL = `
            UPDATE funcionarios 
            SET nome = ?, email = ?, cpf = ?, cargo = ?, salario = ?, dataContratacao = ?, idDepartamentoFuncionario = ?, idSupervisorFuncionario = ?
            WHERE idFuncionario = ?;
        `;

        try {
            const [result] = await conexao.promise().execute(SQL, [
                this._nome,
                this._email,
                this._cpf,
                this._cargo,
                this._salario,
                this._dataContratacao,
                this._idDepartamentoFuncionario,
                this._idSupervisorFuncionario,
                this._idFuncionario
            ]);
            return result.affectedRows > 0;
            
        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
            return false;
        }
    }

    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM funcionarios WHERE idFuncionario = ?';
        try {
            const [result] = await conexao.promise().execute(SQL, [this._idFuncionario]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao deletar funcionário:', error);
            return false;
        }
    }

    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM funcionarios ORDER BY nome';
        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao listar funcionários:', error);
            return [];
        }
    }

    async readByID(idFuncionario) {
        this._idFuncionario = idFuncionario;
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM funcionarios WHERE idFuncionario = ?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._idFuncionario]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Erro ao ler funcionário por ID:', error);
            return null;
        }
    }

    async isFuncionarioByEmail(email) {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT COUNT(*) AS qtd FROM funcionarios WHERE email = ?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [email]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error('Erro ao verificar email:', error);
            return false;
        }
    }

    async login() {
        const conexao = Banco.getConexao();
        const SQL = `
            SELECT idFuncionario, nome, email, cargo 
            FROM funcionarios
            WHERE email = ? AND senha = MD5(?);
        `;

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._email, this._senha]);
            if (rows.length === 1) {
                const user = rows[0];
                this._idFuncionario = user.idFuncionario;
                this._nome = user.nome;
                this._email = user.email;
                this._cargo = user.cargo;
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            return false;
        }
    }

    // Getters e Setters

    get idFuncionario() {
        return this._idFuncionario;
    }

    set idFuncionario(id) {
        this._idFuncionario = id;
        return this;
    }

    get nome() {
        return this._nome;
    }

    set nome(nome) {
        this._nome = nome;
        return this;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
        return this;
    }

    get cpf() {
        return this._cpf;
    }

    set cpf(cpf) {
        this._cpf = cpf;
        return this;
    }

    get cargo() {
        return this._cargo;
    }

    set cargo(cargo) {
        this._cargo = cargo;
        return this;
    }

    get salario() {
        return this._salario;
    }

    set salario(salario) {
        this._salario = salario;
        return this;
    }

    get dataContratacao() {
        return this._dataContratacao;
    }

    set dataContratacao(data) {
        this._dataContratacao = data;
        return this;
    }

    get idDepartamentoFuncionario() {
        return this._idDepartamentoFuncionario;
    }

    set idDepartamentoFuncionario(id) {
        this._idDepartamentoFuncionario = id;
        return this;
    }

    get idSupervisorFuncionario() {
        return this._idSupervisorFuncionario;
    }

    set idSupervisorFuncionario(id) {
        this._idSupervisorFuncionario = id;
        return this;
    }

    get senha() {
        return this._senha;
    }

    set senha(senha) {
        this._senha = senha;
        return this;
    }
}

module.exports = Funcionario;
