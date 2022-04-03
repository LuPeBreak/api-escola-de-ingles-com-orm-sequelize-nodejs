const { Niveis } = require("../models");

class NivelController {
  // lista todos os niveis
  static async list(req, res) {
    try {
      const todosOsNiveis = await Niveis.findAll();
      return res.json(todosOsNiveis);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  // lista um nivel especifico pelo id
  static async find(req, res) {
    try {
      const { id } = req.params;
      const nivel = await Niveis.findOne({
        where: {
          id: Number(id),
        },
      });
      res.json(nivel);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  // Cria um nivel
  static async create(req, res) {
    try {
      const nivel = req.body;
      const nivelCriado= await Niveis.create(nivel);
      res.status(201).json(nivelCriado);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  // Atualiza um nivel especifico pelo id
  static async update(req, res) {
    try {
      const { id } = req.params;
      const dadosParaAtualizarNivel = req.body;
      await Niveis.update(dadosParaAtualizarNivel, {
        where: { id: id },
      });
      const nivelAtualizado = await Niveis.findOne({
        where: {
          id: Number(id),
        },
      });
      res.json(nivelAtualizado);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  // Deleta um nivel especifico pelo id
  static async delete(req, res) {
    try {
      const { id } = req.params;
      await Niveis.destroy({
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

module.exports = NivelController;
