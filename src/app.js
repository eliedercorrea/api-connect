const express = require('express');
const userRoutes = require('./routes/userRoutes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    sucesso: true,
    mensagem: 'API Connect funcionando com sucesso!',
    endpoints: {
      listarUsuarios: 'GET /usuarios',
      buscarUsuario: 'GET /usuarios/:id',
      cadastrarUsuario: 'POST /usuarios',
      atualizarUsuario: 'PUT /usuarios/:id ou PATCH /usuarios/:id',
      removerUsuario: 'DELETE /usuarios/:id'
    }
  });
});

app.use('/usuarios', userRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
