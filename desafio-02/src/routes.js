import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res)=> {
  res.json('Minha API do Gympoint');
})

export default routes;
