# 🧑‍💼 Sistema de Gestão de Funcionários

## 📌 Descrição

Este projeto consiste em uma API desenvolvida para gerenciar dados de funcionários em uma organização, incluindo seus cargos, perfis, departamentos e histórico profissional.  
A API permite a criação, leitura, atualização e exclusão (CRUD) de registros relacionados aos funcionários e sua trajetória dentro da empresa.

---

## 🎯 Objetivos

- ✅ Gerenciar o cadastro de funcionários com dados como nome, CPF, e-mail, cargo, salário, etc.
- ✅ Gerenciar departamentos, perfis e histórico de cargos dos funcionários.
- ✅ Implementar autenticação via JWT para proteger rotas sensíveis.
- ✅ Garantir validações com middlewares dedicados.
- ✅ Fornecer endpoints RESTful organizados por controladores e rotas.
- ✅ Utilizar arquitetura MVC e código modularizado.

---

## 🔍 Tecnologias Utilizadas

### 🔹 Back-end
- Node.js
- Express.js

### 🔹 Banco de Dados
- MySQL (via biblioteca `mysql2`)

### 🔹 Autenticação
- JWT (JSON Web Tokens)

### 🔹 Ferramentas e Bibliotecas Auxiliares
- Insomnia/Postman (para testes de API)
- `md5` (para hash de senhas)

---

## 🧪 Funcionalidades

- 👨‍💼 CRUD completo de Funcionários  
- 🏢 CRUD de Departamentos  
- 🧾 Histórico de cargos de funcionários  
- 🛡 Autenticação e geração de token JWT  
- 📜 Validações com middlewares personalizados  

---

## ▶️ Instruções de Execução

### 🔧 Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- [MySQL Server](https://www.mysql.com/)
- [Git](https://git-scm.com/)

### 💻 Passos para rodar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

2 - **Instale as dependências do projeto:**
  npm install


3 - **Configure o banco de dados MySQL:**
  Crie o banco de dados chamado sistemafuncionarios
  Execute o script Banco.sql que está na raiz do projeto para criar as tabelas e inserir dados iniciais.


4 - **Inicie o servidor:**
  node app.js


5 - **Testar a API com o Insomnia/Postman:**

  Faça requisições para http://localhost:3000/ (ou porta configurada)
  Verifique rotas como:
  POST /login
  GET /funcionarios
  POST /funcionarios
  GET /departamentos
  GET /historicoCargo/:idFuncionario


## 👨‍💻 Desenvolvido por
José Pedro Barros Gadioli – @josepedrobg2

