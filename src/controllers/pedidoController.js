const { pedidoModel } = require('../models/pedidoModel');

const pedidoController = {
    criarPedido: async (req, res) => {
        try {
            const { idCliente, dataPedido, idProduto, quantidade, valorItem } = req.body;

            if (!idCliente || !dataPedido || !idProduto || !quantidade || !valorItem) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente.' });
            }
            const resultado = await pedidoModel.insertPedido(idCliente, dataPedido, idProduto, quantidade, valorItem);

            return res.status(201).json({ message: 'Registro incluído com sucesso.', result: resultado });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }

    },

    criarItem: async (req, res) => {
        try {
            const { idPedido, idProduto, quantidade, valorItem } = req.body;
            if (!idPedido || !idProduto || !quantidade || !valorItem) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente.' });
            }
            const resultado = await pedidoModel.insertItem(idPedido, idProduto, quantidade, valorItem);

            res.status(201).json({message: 'Registro criado com sucesso', data: resultado});

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
};

module.exports = { pedidoController };