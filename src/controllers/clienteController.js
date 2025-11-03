const { clienteModel } = require('../models/clienteModel');

const clienteController = {
    buscarTodosClientes: async (req, res) => {
        try {
            const id = Number(req.query.id);
            if (!id) {
                const resultado = await clienteModel.selecionarTodos();
                if (resultado.length === 0 || !resultado) {
                    return res.status(200).json({ message: "Não há nenhum cliente cadastrado na base de dados no momento." });
                }
                return res.status(200).json({ message: "Resultado dos dados listados:", data: resultado });
            } else {
                if (!Number.isInteger(id)) {
                    return res.status(400).json({ message: "Forneça um identificador (id) válido." });
                }
                const resultado = await clienteModel.selecionarPorId(id);
                if (resultado.length === 0) {
                    return res.status(404).json({ message: "O ID em questão não possui cliente algum cadastrado." });
                }
                return res.status(200).json({ message: "Resultado dos dados listados", data: resultado });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ocorreu um erro no servidor.", errorMessage: error.message });
        }
    },
    buscarClientePorCpf: async (req, res) => {
        try {
            const cpf = (req.params.cpfCliente).replace(/\./g, "");
            if (!cpf || cpf.length != 11) {
                return res.status(400).json({ message: "Forneça um identificador (CPF) válido." });
            }
            const resultado = await clienteModel.selecionarPorCpf(cpf);
            if (resultado.length === 0) {
                throw new Error({ message: "O ID em questão não possui cliente algum cadastrado." });
            }
            return res.status(200).json({ message: "Resultado dos dados listados", data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ocorreu um erro no servidor.", errorMessage: error.message });
        }
    },
    adicionarCliente: async (req, res) => {
        try {
            let { cpfCliente, nomeCliente } = req.body;
            cpfCliente = cpfCliente.replace(/\./g, "");
            if (!cpfCliente || cpfCliente.length != 11 || !String(nomeCliente) || nomeCliente.length < 3) {
                return res.status(400).json({ message: "Valores para registro inválidos." });
            }

            const consultaCpf = await clienteModel.selecionarPorCpf(cpfCliente);

            if (consultaCpf.length === 0) {
                const resultado = await clienteModel.addCliente(cpfCliente, nomeCliente);
                return res.status(200).json({ message: "Registro Incluído com Sucesso.", result: resultado });
            } else {
                throw new Error('Ocorreu um erro ao incluir o registro. O CPF inserido foi igual a um já cadastrado na base de dados.');
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ocorreu um erro no servidor.", errorMessage: error.message });
        }
    },
    atualizarCliente: async (req, res) => {
        try {
            const idCliente = Number(req.params.idCliente);
            let { cpfCliente, nomeCliente } = req.body;
            cpfCliente = cpfCliente.replace(/\./g, "");
            if (!cpfCliente || cpfCliente.length != 11 || !String(nomeCliente) || nomeCliente.length < 3) {
                return res.status(400).json({ message: "Valores para registro inválidos." });
            }
            const clienteAtual = await clienteModel.selecionarPorId(idCliente);

            if (!clienteAtual || clienteAtual.length === 0) {
                throw new Error('Registro não localizado.');
            }

            const novoNome = nomeCliente.trim() ?? clienteAtual[0].cpfCliente;
            const novoCpf = cpfCliente.trim() ?? clienteAtual[0].nomeCliente;

            const consultaCpf = await clienteModel.selecionarPorCpfUpdate(cpfCliente, idCliente);

            if (consultaCpf.length === 0) {
                const resultado = await clienteModel.updateCliente(idCliente, novoCpf, novoNome);
                return res.status(200).json({ message: "Registro Atualizado com Sucesso.", result: resultado });
            } else {
                throw new Error('Ocorreu um erro ao incluir o registro. O CPF inserido  foi igual a um já cadastrado na base de dados.');
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ocorreu um erro no servidor.", errorMessage: error.message });
        }
    },
    excluirCliente: async (req, res) => {
        try {
            const id = Number(req.params.idCliente);
            if (!id || id <= 0 || isNaN(id) || !Number.isInteger(id)) {
                res.status(400).json({ message: "Você deve inserir um número inteiro para campo de ID." });
            }
            const clienteSelecionado = await clienteModel.selecionarPorId(id);

            if (clienteSelecionado.length === 0) {
                throw new Error("O ID em questão não possui cliente algum cadastrado.");
            } else {
                const resultado = await clienteModel.deleteCliente(id);
                if (resultado.affectedRows === 1) {
                    res.status(200).json({ message: 'Cliente excluído com sucesso', data: resultado });
                } else {
                    throw new Error("Não foi possível excluir o cliente.");
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Ocorreu um erro no servidor.", errorMessage: error.message });
        }
    }
}

module.exports = { clienteController };