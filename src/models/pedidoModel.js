const pool = require('../config/db');

const pedidoModel = {
    insertPedido: async (pIdCliente, pDataPedido, pIdProduto, pQuantidade, pValorItem) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            //Insert 1 - Tabela Pedidos
            const sqlPedido = 'INSERT INTO pedidos (idClienteFK, valorTotal, dataPedido) VALUES (?, ?, ?);';
            const valuesPedido = [pIdCliente, pValorItem * pQuantidade, pDataPedido];
            const [rowsPedido] = await connection.query(sqlPedido, valuesPedido);

            //Insert 2 - Tabela de Itens
            const sqlItem = 'INSERT INTO itensPedido (idPedidoFK, idProdutoFK, quantidade, valorItem) VALUES (?,?,?,?);';
            const valuesItem = [rowsPedido.insertId, pIdProduto, pQuantidade, pValorItem];
            const rowsItem = await connection.query(sqlItem, valuesItem);

            connection.commit();
            return { rowsPedido, rowsItem };

        } catch (error) {
            connection.rollback();
            throw error;
        }
    },
    insertItem: async (pIdPedido, pIdProduto, pQuantidadeItem, pValorItem) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const sqlItem = 'INSERT INTO itenspedido (idPedidoFK, idProdutoFK, quantidade, valorItem) VALUES (?,?,?,?);';
            const valuesItem = [pIdPedido, pIdProduto, pQuantidadeItem, pValorItem];
            const [rowsItem] = await connection.query(sqlItem, valuesItem);

            const sqlPedido = 'UPDATE pedidos SET valorTotal = valorTotal +(?*?) WHERE idPedido = ?;';
            const valuesPedido = [pQuantidadeItem, pValorItem, pIdPedido];
            const [rowsPedido] = await connection.query(sqlPedido, valuesPedido);
            connection.commit();
            return { rowsItem, rowsPedido };

        } catch (error) {
            connection.rollback();
            throw error;
        }
    }
};

module.exports = { pedidoModel };