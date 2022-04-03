const { Pessoas } = require("../models");

class PessoaController {
  // lista todas as pessoas
  static async list(req, res) {
    try {
      const todasAsPessoas = await Pessoas.findAll();
      return res.json(todasAsPessoas);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  // lista uma pessoa especifica pelo id
  static async find(req, res) {
    try {
      const { id } = req.params;
      const pessoa = await Pessoas.findOne({
        where: {
          id: Number(id),
        },
      });
      res.json(pessoa);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  // Cria uma pessoa
  static async create(req, res) {
    try {
      const pessoa = req.body;
      const pessoaCriada = await Pessoas.create(pessoa);
      res.status(201).json(pessoaCriada);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  // Atualiza uma pessoa especifica pelo id
  static async update(req, res) {
    try {
      const { id } = req.params;
      const dadosParaAtualizarPessoa = req.body;
      await Pessoas.update(dadosParaAtualizarPessoa, {
        where: { id: id },
      });
      const pessoaAtualizada = await Pessoas.findOne({
        where: {
          id: Number(id),
        },
      });
      res.json(pessoaAtualizada);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  // Deleta uma pessoa especifica pelo id
  static async delete(req, res) {
    try {
      const { id } = req.params;
      await Pessoas.destroy({
        where: {
          id: Number(id),
        },
      });
      res.json({ message: "deletado com sucesso", id: id });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

module.exports = PessoaController;
