const { Turmas } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class TurmaController {
  // lista todas as Turmas
  static async list(req, res) {
    const {data_inicial, data_final} = req.query
    const where = {}

    data_inicial ||data_final ? where.data_inicio={}:null
    data_inicial? where.data_inicio[Op.gte] = data_inicial : null
    data_final? where.data_inicio[Op.lte] = data_final : null

    try {
      const todasAsTurmas = await Turmas.findAll({where})
      return res.json(todasAsTurmas)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // lista uma turma especifica pelo id
  static async find(req, res) {
    try {
      const { id } = req.params
      const turma = await Turmas.findOne({
        where: {
          id: Number(id),
        },
      })
      res.json(turma)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Cria uma turma
  static async create(req, res) {
    try {
      const turma = req.body
      const turmaCriada = await Turmas.create(turma)
      res.status(201).json(turmaCriada)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Atualiza uma turma especifica pelo id
  static async update(req, res) {
    try {
      const { id } = req.params
      const dadosParaAtualizarTurma = req.body
      await Turmas.update(dadosParaAtualizarTurma, {
        where: { id: id },
      })
      const turmaAtualizada = await Turmas.findOne({
        where: {
          id: Number(id),
        },
      })
      res.json(turmaAtualizada)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Deleta uma turma especifica pelo id
  static async delete(req, res) {
    try {
      const { id } = req.params
      await Turmas.destroy({
        where: {
          id: Number(id),
        },
      })
      res.json({ message: 'deletado com sucesso', id: id })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // restaura uma turma deletada pelo softdelete
  static async restore(req,res){
    try {
      const { id } = req.params
      await Turmas.restore({
        where: {
          id: Number(id),
        },
      })
      res.json({ message: 'Restaurado', id: id })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }
}

module.exports = TurmaController
