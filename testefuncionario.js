const Funcionario = require('./model/Funcionario');
const Banco = require('./model/Banco'); // ou './Banco' dependendo da estrutura
// Garante que a conexão com o banco seja inicializada
const conexao = Banco.getConexao();

(async () => {
    // Criando um novo funcionário
    const novoFuncionario = new Funcionario();
    novoFuncionario.nome = 'Maria Silva';
    novoFuncionario.email = 'maria@empresa.com';
    novoFuncionario.senha = '12345'
    novoFuncionario.cpf = '123.456.789-00';
    novoFuncionario.cargo = 'Analista de RH';
    novoFuncionario.salario = 5500.00;
    novoFuncionario.dataContratacao = '2023-06-01';
    novoFuncionario.idDepartamentoFuncionario = 1; // certifique-se que esse ID existe
    novoFuncionario.idSupervisorFuncionario = null;

    const criado = await novoFuncionario.create();
    console.log('Criado:', criado, 'ID:', novoFuncionario.idFuncionario);

    // Buscar pelo ID
    const funcionarioLido = await novoFuncionario.readByID(novoFuncionario.idFuncionario);
    console.log('Funcionário lido por ID:', funcionarioLido);

    // Atualizar o funcionário
    novoFuncionario.nome = 'Maria Aparecida Silva';
    const atualizado = await novoFuncionario.update();
    console.log('Atualizado:', atualizado);

    // Listar todos os funcionários
    const todosFuncionarios = await novoFuncionario.readAll();
    console.log('Todos os funcionários:', todosFuncionarios);

    // Verificar se o e-mail já existe
    const existeEmail = await novoFuncionario.isFuncionarioByEmail('maria@empresa.com');
    console.log('Email já cadastrado?', existeEmail);

    // Testar login (supondo que tenha uma senha salva com MD5 no banco)
    novoFuncionario.email = 'adm@adm';
    novoFuncionario._senha = '123456'; // você pode criar um setter pra senha, se quiser
    const logou = await novoFuncionario.login();
    console.log('Login bem-sucedido?', logou);

    // Deletar o funcionário (comentado para não apagar na primeira vez)
    // const deletado = await novoFuncionario.delete();
    // console.log('Deletado?', deletado);

    process.exit(); // Finaliza o script
})();
