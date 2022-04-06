const Sequelize = require('sequelize')

const {MatriculasServices} = require('../services')
const matriculasServices = new MatriculasServices('Pessoas')
class MatriculaController {

  // lista todas as matriculas de uma pessoa
  static async list(req, res) {
    try {
      const { estudanteId } = req.params
      const matriculas = await matriculasServices.pegaTodosOsRegistros({estudante_id:Number(estudanteId)})
      return res.json(matriculas)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }
  //lista matriculas de uma turma que estao confirmadas
  static async listMatriculasPorTurma(req, res) {
    try {
      const { turmaId } = req.params
      const todasAsMatriculas = await matriculasServices
        .encontraEContaRegistros({
          turma_id:turmaId,
          status:'confirmado'
        },
        {
          limit:20,
          order:[['estudante_id','ASC']]
        }
        )
      res.json(todasAsMatriculas)

    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // pega as matriculas de turmas lotadas
  static async listTurmasLotadas(req, res) {
    const lotacaoTurma = 2
    try {
      const turmasLotadas = await matriculasServices.encontraEContaRegistros(
        { status:'confirmado'},
        {
          attributes:['turma_id'],
          group:['turma_id'],
          having: Sequelize.literal(`count(turma_id)>=${lotacaoTurma}`)
        }
      )

      res.json(turmasLotadas.count)

    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // lista uma matricula especifica pelo id
  static async find(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params
      const matricula = await matriculasServices.pegaUmRegistro(matriculaId,estudanteId)
      res.json(matricula)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Cria uma Matricula
  static async create(req, res) {
    try {
      const { estudanteId } = req.params
      const matricula = { ...req.body, estudante_id: Number(estudanteId) }
      const matriculaCriada = await matriculasServices.criaRegistro(matricula)
      res.status(201).json(matriculaCriada)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Atualiza uma Matricula especifica pelo id
  static async update(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params
      const dadosParaAtualizarPessoa = req.body
      const matriculaAtualizada = await matriculasServices.atualizaRegistrosEPega(dadosParaAtualizarPessoa, {
        id: Number(matriculaId), estudante_id: Number(estudanteId) },
      )
      res.json(matriculaAtualizada)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Deleta uma Matricula especifica pelo id
  static async delete(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params
      await matriculasServices.deletaRegistros({
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      })
      res.json({ message: 'deletado com sucesso', id: matriculaId })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // restaura uma matricula deletada pelo softdelete
  static async restore(req,res){
    try {
      const { estudanteId, matriculaId } = req.params
      await matriculasServices.restauraRegistros({
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      })
      res.json({ message: 'Restaurado', id: matriculaId })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  
}

module.exports = MatriculaController
