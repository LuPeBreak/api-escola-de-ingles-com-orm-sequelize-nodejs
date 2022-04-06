const {PessoasServices} = require('../services')
const pessoasServices = new PessoasServices('Pessoas')
class PessoaController {
  // lista todas as pessoas Ativas
  static async listActive(req, res) {
    try {

      const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
      return res.json(pessoasAtivas)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // lista todas as pessoas
  static async listAll(req, res) {
    try {
      const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
      return res.json(todasAsPessoas)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // lista uma pessoa especifica pelo id
  static async find(req, res) {
    try {
      const { id } = req.params
      const pessoa = await pessoasServices.pegaUmRegistro(id)
      res.json(pessoa)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Cria uma pessoa
  static async create(req, res) {
    try {
      const pessoa = req.body
      const pessoaCriada = await pessoasServices.criaRegistro(pessoa)
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
      const pessoaAtualizada = await pessoasServices.atualizaRegistroEPega(dadosParaAtualizarPessoa, id)
      res.json(pessoaAtualizada)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // Deleta(softdelete) uma pessoa especifica pelo id
  static async delete(req, res) {
    try {
      const { id } = req.params
      await pessoasServices.deletaRegistro(id)
      res.json({ message: 'deletado com sucesso', id: id })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }
  static async DeactivatePessoaMatriculas(req, res) {
    const { estudanteId } = req.params
    try {
      await pessoasServices.cancelaPessoasEMatriculas(estudanteId)
      res.json({ message: `Estudante e Matriculas desativados - ID : ${estudanteId}` })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  // restaura uma pessoa deletada pelo softdelete
  static async restore(req,res){
    try {
      const { id } = req.params
      await pessoasServices.restauraRegistro(id)
      res.json({ message: 'Restaurado', id: id })
    } catch (err) {
      res.status(500).json(err.message)
    }
  }
}

module.exports = PessoaController
