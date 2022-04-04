const { Pessoas, Matriculas } = require('../models')

class PessoaController {
  // lista todas as pessoas
  static async list(req, res) {
    try {
      const todasAsPessoas = await Pessoas.findAll()
      return res.json(todasAsPessoas)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // lista uma pessoa especifica pelo id
  static async find(req, res) {
    try {
      const { id } = req.params
      const pessoa = await Pessoas.findOne({
        where: {
          id: Number(id),
        },
      })
      res.json(pessoa)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Cria uma pessoa
  static async create(req, res) {
    try {
      const pessoa = req.body
      const pessoaCriada = await Pessoas.create(pessoa)
      res.status(201).json(pessoaCriada)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Atualiza uma pessoa especifica pelo id
  static async update(req, res) {
    try {
      const { id } = req.params
      const dadosParaAtualizarPessoa = req.body
      await Pessoas.update(dadosParaAtualizarPessoa, {
        where: { id: id },
      })
      const pessoaAtualizada = await Pessoas.findOne({
        where: {
          id: Number(id),
        },
      })
      res.json(pessoaAtualizada)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Deleta(softdelete) uma pessoa especifica pelo id
  static async delete(req, res) {
    try {
      const { id } = req.params
      await Pessoas.destroy({
        where: {
          id: Number(id),
        },
      })
      res.json({ message: 'deletado com sucesso', id: id })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // restaura uma pessoa deletada pelo softdelete
  static async restore(req,res){
    try {
      const { id } = req.params
      await Pessoas.restore({
        where: {
          id: Number(id),
        },
      })
      res.json({ message: 'Restaurado', id: id })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  //---------------------- MATRICULAS -----------------------//

  // lista todas as matriculas de uma pessoa
  static async listMatriculas(req, res) {
    try {
      const { estudanteId } = req.params
      const todasAsMatriculas = await Matriculas.findAll({
        where: {
          estudante_id: estudanteId,
        },
      })
      return res.json(todasAsMatriculas)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // lista uma matricula especifica pelo id
  static async findMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params
      const matricula = await Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      })
      res.json(matricula)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Cria uma Matricula
  static async createMatricula(req, res) {
    try {
      const { estudanteId } = req.params
      const matricula = { ...req.body, estudante_id: Number(estudanteId) }
      const matriculaCriada = await Matriculas.create(matricula)
      res.status(201).json(matriculaCriada)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Atualiza uma Matricula especifica pelo id
  static async updateMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params
      const dadosParaAtualizarPessoa = req.body
      await Matriculas.update(dadosParaAtualizarPessoa, {
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      })
      const matriculaAtualizada = await Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: estudanteId,
        },
      })
      res.json(matriculaAtualizada)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Deleta uma Matricula especifica pelo id
  static async deleteMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params
      await Matriculas.destroy({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      })
      res.json({ message: 'deletado com sucesso', id: estudanteId })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // restaura uma pessoa deletada pelo softdelete
  static async restoreMatricula(req,res){
    try {
      const { estudanteId, matriculaId } = req.params
      await Pessoas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      })
      res.json({ message: 'Restaurado', id: estudanteId })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  
}

module.exports = PessoaController
