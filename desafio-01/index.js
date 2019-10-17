const express = require('express');

// Inicia
const server = express();

// Configura para receber dados via json
server.use(express.json());

// Total de requisições
let totalDeRequisicoes = 0;

// Projetos
const projects = [];

/**
 * MIDDLEWARES
 */
function verificaSeExiste(req, res, next){

  const { id } = req.params;
 
  const projeto = projects.find( (elemento) => elemento.id == id);

  if(!projeto){
    return res.status(400).json({ error: 'Projeto não encontrado'})
  }

  return next();
}

function verificaSeExisteViaPost(req, res, next){

  const { id } = req.body;
 
  const projeto = projects.find( (elemento) => elemento.id == id);

  if(projeto){
    return res.status(400).json({ error: 'Projeto ja cadastrado'})
  }

  return next();
}

function contaRequisicoes(req, res, next){
  totalDeRequisicoes++;

  console.log(`Total de requisições feitas: ${totalDeRequisicoes}`);

  return next();
}

server.use(contaRequisicoes);

// Rota para criar novo projeto
server.post('/projects', verificaSeExisteViaPost, (req, res) => {
    const { id, title} = req.body;

    const project = {
      id,
      title,
      tasks: []
    };

    projects.push(project);

    return res.json(project);

});

// Rota para listar projetos
server.get('/projects', (req, res) => {
    return res.json(projects);
});

// Rota para alterar apenas o titulo do projeto
server.put('/projects/:id', verificaSeExiste, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    // Function para localizar objeto dentro do array
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const project = projects.find( (elemento) => {
        return elemento.id == id;
    });

    project.title = title;
    return res.json(project);
});

// A rota deve deletar o projeto 
server.delete('/projects/:id', verificaSeExiste, (req, res) => {
    const { id } = req.params;

    //encontra elemento
    //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    const projectPosicao = projects.findIndex( (elemento) => elemento.id == id);

    projects.splice(projectPosicao, 1);
    return res.send();
});

// A rota deve receber um campo title e armazenar uma nova 
// tarefa no array de tarefas de um projeto específico escolhido
// através do id presente nos parâmetros da rota;
server.post('/projects/:id/tasks', verificaSeExiste, (req, res) => {
    const { id } = req.params;
    //titulo da nova tarefa
    const { title } = req.body;

    const projeto = projects.find( (elemento) => elemento.id == id);

    projeto.tasks.push(title);

    return res.json(projeto);
});

server.listen(3001);