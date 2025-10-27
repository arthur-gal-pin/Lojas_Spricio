const express = require('express');
const clienteRoutes = express.Router();

const { clienteController } = require('../controllers/clienteController');

clienteRoutes.get('/clientes', clienteController.buscarTodosClientes);
clienteRoutes.get('/clientes/id/:idCliente', clienteController.buscarClientePorId);
clienteRoutes.get('/clientes/cpf/:cpfCliente', clienteController.buscarClientePorCpf);
clienteRoutes.post('/clientes', clienteController.adicionarCliente);
clienteRoutes.put('/clientes/:idCliente', clienteController.atualizarCliente);
clienteRoutes.delete('/clientes/:idCliente', clienteController.excluirCliente);

module.exports = { clienteRoutes };