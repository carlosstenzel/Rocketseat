import { Router } from 'express';

import SessionController from "./app/controllers/SessionController";
import StudentsController from "./app/controllers/StudentsController"
import authMiddleware from "./app/middleware/auth";
import PlanoController from './app/controllers/PlanoController';

const routes = new Router();

routes.get('/', (req, res)=> {
  res.json('Minha API do Gympoint');
});

routes.post('/sessions', SessionController.store);

//controle ADMIN
routes.use(authMiddleware);
routes.get('/alunos', StudentsController.index);
routes.post('/alunos', StudentsController.store);
routes.put('/alunos/:id', StudentsController.update);

routes.get('/planos', PlanoController.index);
routes.post('/planos', PlanoController.store);
routes.put('/planos:id', PlanoController.update);
routes.delete('/planos/:id', PlanoController.delete);




export default routes;
