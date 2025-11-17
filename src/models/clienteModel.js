const pool = require('../config/db');

const clienteModel = {
    selecionarTodos: async (idCliente) => {
        const sql = idCliente ? 'SELECT * FROM clientes WHERE idCliente=?;' : 'SELECT * FROM clientes;';
        const values = [idCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    selecionarPorId: async (idCliente) => {
        const sql = 'SELECT * FROM clientes WHERE idCliente=?;';
        const values = [idCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    selecionarPorCpf: async (cpfCliente) => {
        const sql = 'SELECT * FROM clientes WHERE cpfCliente=?;';
        const values = [cpfCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    selecionarPorCpfUpdate: async (cpfCliente, idCliente) => {
        const sql = 'SELECT * FROM clientes WHERE cpfCliente = ? AND idCliente <> ?;';
        const values = [cpfCliente, idCliente];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
    addCliente: async (cpfCliente, nomeCLiente) => {
        const sql = 'INSERT INTO clientes (nomeCliente, cpfCliente) VALUES (?,?);';
        const values = [nomeCLiente, cpfCliente];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
    updateCliente: async (idCliente, cpfCliente, nomeCLiente) => {
        const sql = 'UPDATE clientes SET nomeCliente = ?, cpfCliente = ? WHERE idCliente = ?;';
        const values = [nomeCLiente, cpfCliente, idCliente];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
    deleteCliente: async (idCliente) => {
        const sql = 'DELETE FROM clientes WHERE idCliente = ?;';
        const [rows] = await pool.query(sql, idCliente);
        console.log(rows);
    }
}

module.exports = { clienteModel };