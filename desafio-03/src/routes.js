import { Router } from 'express';

import SessionController from "./app/controllers/SessionController";
import StudentsController from "./app/controllers/StudentsController"
import authMiddleware from "./app/middleware/auth";
import PlanoController from './app/controllers/PlanoController';
import MatriculationController from './app/controllers/MatriculationController';
import CheckinsController from './app/controllers/CheckinsController';
import HelpOrdersController from './app/controllers/HelpOrdersController';

const routes = new Router();

routes.get('/', (req, res)=> {
  res.json('Minha API do Gympoint');
});

routes.post('/sessions', SessionController.store);

routes.post('/students/:id/checkins', CheckinsController.store);
routes.get('/students/:id/checkins', CheckinsController.index);
routes.post('/students/:id/help-orders', HelpOrdersController.store);

//controle ADMIN
routes.use(authMiddleware);
routes.get('/alunos', StudentsController.index);
routes.post('/alunos', StudentsController.store);
routes.put('/alunos/:id', StudentsController.update);

routes.get('/planos', PlanoController.index);
routes.post('/planos', PlanoController.store);
routes.put('/planos/:id', PlanoController.update);
routes.delete('/planos/:id', PlanoController.delete);

routes.get('/matriculation', MatriculationController.index);
routes.post('/matriculation', MatriculationController.store);
routes.put('/matriculation/:id', MatriculationController.update);
routes.delete('/matriculation/:id', MatriculationController.delete);

routes.get('/help-orders/not-answer', HelpOrdersController.index);
routes.get('/students/:id/help-orders', HelpOrdersController.index);
routes.put('/help-orders/:id/answer', HelpOrdersController.update);



export default routes;
