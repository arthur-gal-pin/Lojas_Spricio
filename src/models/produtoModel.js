const pool = require('../config/db');

const produtoModel = {
    /**
     * Seleciona todos os produtos cadastrados na tabela
     * @async
     * @function selecionarTodos
     * @returns Retorna o resultado com um array de objetos, cada objeto representa um registro na tabela
     * 
     * @example
     * const produtos = await produto.Model.selecionarTodos();
     * console.log(produtos);
     * //Saída Esperada
     * [
     *      {id_produto: 1, descricao: "Teclado", valor: 150.00}
     *      {id_produto: 2, descricao: "Mouse", valor: 399.00}
     * ]
     */
    //selecionar todos os produtos
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    /**
     * Seleciona um produto de acordo com o id_produto especificado
     * @async
     * @param {number} id Identificador que deve ser pesquisado no banco de dados.
     * @returns {Promise<Array<Object>>}
     * @example
     * const produto = await produtoModel.selecionarPorId(1);
     * console.log(produto);
     * //Saída Esperada
     * [
     *      {id_produto: 1, descricao: "Teclado", valor: 150.00}     
     * ]
     */
    selecionarPorId: async (id) => {
        const sql = 'SELECT * FROM produtos WHERE idProduto = ?;';
        const values = [id];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * 
     * Insere um item novo no banco de dados
     * @param {String} pDescricao 
     * @param {Number} pValor 
     * @returns {Promise<Object>} Retorna um objeto contendo propriedades que representam as informações do comando executado
     *@example
     * const produtos = await produtoModel.inserirProduto('Produto_teste', 16.99);
     * //Saída
     * result: {
        "message": "Registro incluído com sucesso",
            "result": {
            "fieldCount": 0,
            "affectedRows": 1,
            "insertId": 1,
            "info": "",
            "serverStatus": 2,
            "warningStatus": 0,
            "changedRows": 0
            }
        }
     */
    inserirProduto: async (pDescricao, pValor) => {
        const sql = 'INSERT INTO produtos (descricao, valor) VALUES (?,?);';
        const values = [pDescricao, pValor];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },

    /**
     * 
     * Edita as informações acerca de um item já inserido no banco de dados
    * @param {Number} pId 
     * @param {String} pDescricao 
     * @param {Number} pValor 
     * @returns {Promise<Object>} Retorna um objeto contendo propriedades que representam as informações do comando executado
     *@example
     * const produtos = await produtoModel.alterarProduto(1, 'Produto_teste', 16.99);
     * //Saída
     * result: {
        "message": "Registro alterado com sucesso",
            "result": {
            "fieldCount": 0,
            "affectedRows": 1,
            "insertId": 0,
            "info": "",
            "serverStatus": 2,
            "warningStatus": 0,
            "changedRows": 0
            }
        }
     */
    alterarProduto: async (pId, pDescricao, pValor) => {
        const sql = 'UPDATE produtos SET descricao=?, valor=? WHERE idProduto=?;';
        const values = [pDescricao, pValor, pId];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },

    deleteProduto: async (pId) => {
        const sql = 'DELETE FROM produtos WHERE idProduto=?;';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    }
};

module.exports = { produtoModel };