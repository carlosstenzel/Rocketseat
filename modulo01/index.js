const express = require('express');

const server = express();
server.use(express.json());
// CRUD - Create, Read, Update, Delete

const users = ['Carlos', 'Beto', 'Stenzel', 'Barbosa'];

//Lista usuarios
server.get('/users', (req, res) => {
   return res.json(users);
});

//Lista 1 usuario
server.get('/users/:index', (req, res) => {
   const { index } = req.params;
  
   return res.json(users[index]);
});

//Criando Usuario
server.post('/users', (req, res) => {
   const { name } = req.body;

   users.push(name);

   return res.json(users);
});

// Editar
server.put('/users/:index', (req, res) => {
   const { index } = req.params;
   const { name } = req.body;

   users[index] = name;
   return res.json(users);
});

//Delete
server.delete('/users/:index', (req, res) => {
   const { index } = req.params;

   users.splice(index, 1);

   return res.send();
});
 
server.listen(3000);