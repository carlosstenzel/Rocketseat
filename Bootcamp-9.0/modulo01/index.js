const express = require('express');

const server = express();
server.use(express.json());
// CRUD - Create, Read, Update, Delete

const users = ['Carlos', 'Beto', 'Stenzel', 'Barbosa'];

// Middlewares
function checkUserExists(req, res, next){
   if(!req.body.name){
      return res.status(400).json({error: 'User name is required'});
   }
   return next();
}

function checkUserInArray(req, res, next){
   if(!user[req.params.index]){
      return res.status(400).json({error: 'User does not exists'});
   }
   return next();
}

//Lista usuarios
server.get('/users', (req, res) => {
   return res.json(users);
});

//Lista 1 usuario
server.get('/users/:index', checkUserExists, (req, res) => {
   const { index } = req.params;
  
   return res.json(users[index]);
});

//Criando Usuario
server.post('/users', checkUserExists, (req, res) => {
   const { name } = req.body;

   users.push(name);

   return res.json(users);
});

// Editar
server.put('/users/:index', checkUserExists, checkUserExists, (req, res) => {
   const { index } = req.params;
   const { name } = req.body;

   users[index] = name;
   return res.json(users);
});

//Delete
server.delete('/users/:index', checkUserExists, (req, res) => {
   const { index } = req.params;

   users.splice(index, 1);

   return res.send();
});
 
server.listen(3000);