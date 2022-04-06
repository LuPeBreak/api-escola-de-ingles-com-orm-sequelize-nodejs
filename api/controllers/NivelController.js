// const { Niveis } = require('../models')
const {NiveisServices} = require('../services')
const niveisServices = new NiveisServices()
class NivelController {
  // lista todos os niveis
  static async list(req, res) {
    try {
      const todosOsNiveis = await niveisServices.pegaTodosOsRegistros()
      return res.json(todosOsNiveis)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // lista um nivel especifico pelo id
  static async find(req, res) {
    try {
      const { id } = req.params
      const nivel = await niveisServices.pegaUmRegistro(id)
      res.json(nivel)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Cria um nivel
  static async create(req, res) {
    try {
      const nivel = req.body
      const nivelCriado= await niveisServices.criaRegistro(nivel)
      res.status(201).json(nivelCriado)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Atualiza um nivel especifico pelo id
  static async update(req, res) {
    try {
      const { id } = req.params
      const dadosParaAtualizarNivel = req.body
      const nivelAtualizado =await niveisServices.atualizaRegistroEPega(dadosParaAtualizarNivel,id)
      res.json(nivelAtualizado)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Deleta um nivel especifico pelo id
  static async delete(req, res) {
    try {
      const { id } = req.params
      await niveisServices.deletaRegistro(id)
      res.json({ message: 'deletado com sucesso', id: id })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // restaura um nivel deletado pelo softdelete
  static async restore(req,res){
    try {
      const { id } = req.params
      await niveisServices.restauraRegistro(id)
      res.json({ message: 'Restaurado', id: id })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

}

module.exports = NivelController
