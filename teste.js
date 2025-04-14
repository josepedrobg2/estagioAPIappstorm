const Banco = require('./model/Banco'); // ou './Banco' dependendo da estrutura
const Perfil = require('./model/Perfil');

// Garante que a conexão com o banco seja inicializada
const conexao = Banco.getConexao();

// Cria uma nova instância do perfil e preenche os dados
const perfil = new Perfil();
perfil
  .idade = 30;
perfil
  .endereco = 'Rua A, 123';
perfil
  .telefone = '11999999999';
perfil
  .genero = 'Masculino';
perfil
  .estado_civil = 'Solteiro';

// Cria o perfil no banco e imprime o resultado
perfil.create().then((res) => {
  console.log('Perfil criado?', res);
  conexao.end(); // Fecha a conexão após o teste
}); 
