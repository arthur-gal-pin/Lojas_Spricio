const pool = require('../config/db');

const clienteModel = {
    selecionarTodos: async (idCliente) => {
        const sql = idCliente ? 'SELECT * FROM clientes WHERE id_cliente=?;' : 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },
    selecionarPorId: async (idCliente) => {
        const sql = 'SELECT * FROM clientes WHERE id_cliente=?;';
        const values = [idCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    selecionarPorCpf: async (cpfCliente) => {
        const sql = 'SELECT * FROM clientes WHERE cpf_cliente=?;';
        const values = [cpfCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    selecionarPorCpfUpdate: async (cpfCliente, idCliente) => {
        const sql = 'SELECT * FROM clientes WHERE cpf_cliente = ? AND id_cliente <> ?;';
        const values = [cpfCliente, idCliente];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
    addCliente: async (cpfCliente, nomeCLiente) => {
        const sql = 'INSERT INTO clientes (nome_cliente, cpf_cliente) VALUES (?,?);';
        const values = [nomeCLiente, cpfCliente];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
    updateCliente: async (idCliente, cpfCliente, nomeCLiente) => {
        const sql = 'UPDATE clientes SET nome_cliente = ?, cpf_cliente = ? WHERE id_cliente = ?;';
        const values = [nomeCLiente, cpfCliente, idCliente];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
    deleteCliente: async (idCliente) => {
        const sql = 'DELETE FROM clientes WHERE id_cliente = ?;';
        const [rows] = await pool.query(sql, idCliente);
        console.log(rows);
    }
}

module.exports = { clienteModel };