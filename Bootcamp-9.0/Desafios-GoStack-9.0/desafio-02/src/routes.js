import { Router } from 'express';

import SessionController from "./app/controllers/SessionController";
import StudentsController from "./app/controllers/StudentsController"
import authMiddleware from "./app/middleware/auth";

const routes = new Router();

routes.get('/', (req, res)=> {
  res.json('Minha API do Gympoint');
});

routes.post('/sessions', SessionController.store);
routes.get('/alunos', authMiddleware, StudentsController.index);
routes.post('/alunos', authMiddleware, StudentsController.store);
routes.put('/alunos/:id', authMiddleware, StudentsController.update);
export default routes;
