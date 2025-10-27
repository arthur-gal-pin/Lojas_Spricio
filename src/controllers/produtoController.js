const { produtoModel } = require('../models/produtoModel');

const produtoController = {
    /**
     * Retorna todos os produtos cadastrados no banco de dados.
     * Rota do Tipo GET/produtos
     * @async
     * @function buscarTodosProdutos
     * @param {Request} req Objeto da Requisição HTTP
     * @param {Response} res Objeto da Resposta HTTP
     * @returns {Promise<Array<Object>>} Uma lista com todos os produtos
     */
    buscarTodosProdutos: async (req, res) => {
        try {
            const resultado = await produtoModel.selecionarTodos();
            if (resultado.length === 0) {
                return res.status(200).json({ message: "A tabela referente à requisição não contém nenhum dado." });
            }
            res.status(200).json({ message: "Resultado dos dados listados", data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ocorreu um erro no servidor.", errorMessage: error.message });
        }
    },
    buscarProdutoPorId: async (req, res) => {
        /**
         * Retorna um produto especifico, baseado em seu identificador, cadastrado no Banco de Dados.
         * Rota do Tipo GET/produtos/idProduto/:id
         * @async
         * @function buscarTodosProdutos
         * @param {Request} req Objeto da Requisição HTTP
         * @param {Response} res Objeto da Resposta HTTP
         * @returns {Promise<Array<Object>>} Uma lista com todas as informações referentes a um produto
         */

        try {
            const id = Number(req.params.idProduto);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: "Forneça um identificador (id) válido." });
            }
            const resultado = await produtoModel.selecionarPorId(id);
            if (resultado.length === 0) {
                throw new Error({ message: "O ID em questão não possui produto algum cadastrado." });
            }
            return res.status(200).json({ message: "Resultado dos dados listados", data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ocorreu um erro no servidor.", errorMessage: error.message });
        }
    },
    /**
     * Cria um novo item na base de dados
     * @async
     * @param {Request} req Objeto da Requisição HTTP
     * @param {Response} res Objeto da Resposta HTTP
     * @function incluirProduto
     * @returns {Promise<Object>} Retorna objeto contendo as informações sobre o resultado do insert
     */
    incluirProduto: async (req, res) => {
        try {
            let { descricao, valor } = req.body;
            if (!String(descricao) || descricao.length < 3 || valor <= 0) {
                return res.status(400).json({ message: 'Dados Inválidos' });
            }
            const resultado = await produtoModel.inserirProduto(descricao, valor);

            if (resultado.affectedRows === 1 && resultado.insertedId != 0) {
                return res.status(201).json({ message: "Registro incluído com sucesso", result: resultado })
            } else {
                throw new Error('Ocorreu um erro ao incluir o registro.');
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ocorreu um erro no servidor.", errorMessage: error.message });
        }
    },
    /**
     * Modifica um item existente na base de dados utilizando do ID
     * @async 
     * @param {Request} req Objeto da Requisição HTTP
     * @param {Response} res Objeto da Resposta HTTP
     * @function modificarProduto
     * @returns {Promise<Object>} Retorna objeto contendo as informações sobre o resultado do update
     */
    modificarProduto: async (req, res) => {
        try {
            const id = Number(req.params.idProduto);
            const { descricao, valor } = req.body;

            if (!id || !String(descricao) || !descricao || descricao.trim().length < 3 || isNaN(valor) || !valor || valor <= 0) {
                return res.status(400).json({ message: 'Dados Inválidos' });
            }

            const produtoAtual = await produtoModel.selecionarPorId(id);
            if (!produtoAtual || produtoAtual.length === 0) {
                throw new Error('Registro não localizado.');
            }

            const novaDescricao = descricao.trim() ?? produtoAtual[0].descricao;
            const novaValor = valor.trim() ?? produtoAtual[0].valor;

            const resultado = await produtoModel.alterarProduto(id, novaDescricao, novaValor);

            if (resultado.changedRows === 0) {
                throw new Error('Ocorreu um erro ao atualizar o registro.');
            }

            return res.status(200).json({ message: "Registro atualizado com sucesso", result: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ocorreu um erro no servidor.", errorMessage: error.message });
        }
    },
    /**
     * Exclui um item existente na base de dados utilizando do ID
     * @async
     * @param {Request} req Objeto da Requisão HTTP
     * @param {Response} res Objeto da Resposta HTTP
     * @function excluirProduto
     * @returns {Promise<Object>} Retorna objeto contendo as informações sobre o resultado do update
     */
    excluirProduto: async (req, res) => {
        try {
            const id = Number(req.params.idProduto);
            if (!id || isNaN(id) || !Number.isInteger(id)) {
                res.status(400).json({ message: "Você deve inserir um número inteiro para campo de ID." });
            }
            const produtoSelecionado = await produtoModel.selecionarPorId(id);

            if (produtoSelecionado.length === 0) {
                throw new Error("O ID em questão não possui produto algum cadastrado.");
            } else {
                const resultado = await produtoModel.deleteProduto(id);
                if (resultado.affectedRows === 1) {
                    res.status(200).json({ message: 'Produto excluído com sucesso', data: resultado });
                } else {
                    throw new Error("Não foi possível excluir o produto");
                }
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ocorreu um erro no servidor.", errorMessage: error.message });
        }
    }
}



module.exports = { produtoController };