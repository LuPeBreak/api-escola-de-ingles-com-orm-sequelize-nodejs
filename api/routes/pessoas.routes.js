const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const PessoaRouter = Router()

PessoaRouter.get('/', PessoaController.listActive)
PessoaRouter.get('/todos', PessoaController.listAll)
PessoaRouter.post('/', PessoaController.create)
PessoaRouter.post('/:id/restaura', PessoaController.restore)
PessoaRouter.post('/:estudanteId/cancela', PessoaController.DeactivatePessoaMatriculas)
PessoaRouter.get('/:id', PessoaController.find)
PessoaRouter.put('/:id', PessoaController.update)
PessoaRouter.delete('/:id', PessoaController.delete)

//Matriculas
PessoaRouter.get('/:estudanteId/matriculas', PessoaController.listMatriculas)
PessoaRouter.get('/matriculas/:turmaId/confirmadas',PessoaController.listMatriculasPorTurma)
PessoaRouter.get('/matriculas/lotadas',PessoaController.listTurmasLotadas)
PessoaRouter.get('/:estudanteId/matriculas/:matriculaId', PessoaController.findMatricula)
PessoaRouter.post('/:estudanteId/matriculas', PessoaController.createMatricula)
PessoaRouter.post('/:estudanteId/matriculas/:matriculaId/restaura', PessoaController.restoreMatricula)
PessoaRouter.put('/:estudanteId/matriculas/:matriculaId', PessoaController.updateMatricula)
PessoaRouter.delete('/:estudanteId/matriculas/:matriculaId', PessoaController.deleteMatricula)

module.exports = PessoaRouter
