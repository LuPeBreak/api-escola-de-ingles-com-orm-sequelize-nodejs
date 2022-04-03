const database = require("../models");

class PessoaController {
  static async list(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll();
      return res.json(todasAsPessoas);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  static async find(req, res) {
    try {
      const { id } = req.params;
      const pessoa = await database.Pessoas.findOne({
        where: {
          id,
        },
      });
      res.json(pessoa);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

module.exports = PessoaController;
