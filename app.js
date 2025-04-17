const express = require('express');
const path = require('path');  // Módulo para manipular caminhos de arquivo
const DepartamentoRouter = require('./router/DepartamentoRouter');
const FuncionarioRouter = require('./router/FuncionarioRouter');
const HistoricoCargoRouter = require('./router/HistoricoCargoRouter')
const PerfilRouter = require('./router/PerfilRouter')
const LoginRouter = require('./router/LoginRouter');

const app = express();

const portaServico = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'view'))); // Configura a pasta 'view' como estática

const departamentoRouter = new DepartamentoRouter();
const perfilRouter = new PerfilRouter();
const historicoCargoRouter = new HistoricoCargoRouter();
const funcionarioRouter = new FuncionarioRouter();
const loginRouter = new LoginRouter();


app.use('/login',
    loginRouter.createRoutes()
);

app.use('/departamento',
    departamentoRouter.createRoutes()
);
app.use('/funcionarios',
    funcionarioRouter.createRoutes()
);
app.use('/historicoCargos',
    historicoCargoRouter.createRoutes()
);
app.use('/perfis',
    perfilRouter.createRoutes()
);
// Inicia o servidor, escutando na porta definida, e exibe uma mensagem no console com a URL onde o servidor está rodando.
app.listen(portaServico, () => {
    console.log(`API rodando no endereço: http://localhost:${portaServico}/`);
});

