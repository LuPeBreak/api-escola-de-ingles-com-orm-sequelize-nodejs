// const { Turmas } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const {TurmasServices} = require('../services')
const turmasServices = new TurmasServices()

class TurmaController {
  // lista todas as Turmas
  static async list(req, res) {
    const {data_inicial, data_final} = req.query
    const where = {}

    data_inicial ||data_final ? where.data_inicio={}:null
    data_inicial? where.data_inicio[Op.gte] = data_inicial : null
    data_final? where.data_inicio[Op.lte] = data_final : null

    try {
      const todasAsTurmas = await turmasServices.pegaTodosOsRegistros(where)
      return res.json(todasAsTurmas)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // lista uma turma especifica pelo id
  static async find(req, res) {
    try {
      const { id } = req.params
      const turma = await turmasServices.pegaUmRegistro(id)
      res.json(turma)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Cria uma turma
  static async create(req, res) {
    try {
      const turma = req.body
      const turmaCriada = await turmasServices.criaRegistro(turma)
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
      const turmaAtualizada =  await turmasServices.atualizaRegistroEPega(dadosParaAtualizarTurma,id)
      res.json(turmaAtualizada)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Deleta uma turma especifica pelo id
  static async delete(req, res) {
    try {
      const { id } = req.params
      await turmasServices.deletaRegistro(id)
      res.json({ message: 'deletado com sucesso', id: id })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // restaura uma turma deletada pelo softdelete
  static async restore(req,res){
    try {
      const { id } = req.params
      await turmasServices.restauraRegistro(id)
      res.json({ message: 'Restaurado', id: id })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }
}

module.exports = TurmaController
