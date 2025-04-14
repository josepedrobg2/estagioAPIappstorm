CREATE DATABASE IF NOT EXISTS sistemafuncionarios;
USE sistemafuncionarios;

-- Tabela: departamentos
CREATE TABLE departamentos (
    idDepartamento INT AUTO_INCREMENT PRIMARY KEY,
    nomeDepartamento VARCHAR(255),
    orcamento FLOAT,
    localizacao VARCHAR(255),
    dataCriacao DATE
);

-- Tabela: funcionarios
CREATE TABLE funcionarios (
    idFuncionario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    cpf VARCHAR(14),
    cargo VARCHAR(255),
    salario DECIMAL(10,2),
    dataContratacao DATE,
    idDepartamentoFuncionario INT,
    idSupervisorFuncionario INT,
    senha VARCHAR(255),
    FOREIGN KEY (idDepartamentoFuncionario) REFERENCES departamentos(idDepartamento),
    FOREIGN KEY (idSupervisorFuncionario) REFERENCES funcionarios(idFuncionario)
);

-- Tabela: perfis
CREATE TABLE perfis (
    idPerfil INT AUTO_INCREMENT PRIMARY KEY,
    idFuncionarioPerfil INT,
    idade INT,
    endereco VARCHAR(255),
    telefone VARCHAR(255),
    genero ENUM('Masculino', 'Feminino', 'Outro'),
    estado_civil ENUM('Solteiro', 'Casado', 'Divorciado', 'Viúvo'),
    FOREIGN KEY (idFuncionarioPerfil) REFERENCES funcionarios(idFuncionario)
);

-- Tabela: historicocargos
CREATE TABLE historicocargos (
    idHistoricoCargos INT AUTO_INCREMENT PRIMARY KEY,
    idFuncionarioHistorico INT,
    cargoAnterior VARCHAR(255),
    novoCargo VARCHAR(255),
    dataAlteracao DATE,
    FOREIGN KEY (idFuncionarioHistorico) REFERENCES funcionarios(idFuncionario)
);
