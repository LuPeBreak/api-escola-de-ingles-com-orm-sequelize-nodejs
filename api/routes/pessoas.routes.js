const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')
const MatriculaController = require('../controllers/MatriculaController')

const PessoaRouter = Router()

PessoaRouter.get('/', PessoaController.listAll)
PessoaRouter.get('/ativas', PessoaController.listActive)
PessoaRouter.post('/', PessoaController.create)
PessoaRouter.post('/:id/restaura', PessoaController.restore)
PessoaRouter.post('/:estudanteId/cancela', PessoaController.DeactivatePessoaMatriculas)
PessoaRouter.get('/:id', PessoaController.find)
PessoaRouter.put('/:id', PessoaController.update)
PessoaRouter.delete('/:id', PessoaController.delete)

//Matriculas
PessoaRouter.get('/:estudanteId/matriculas', MatriculaController.list)
PessoaRouter.get('/matriculas/:turmaId/confirmadas',MatriculaController.listMatriculasPorTurma)
PessoaRouter.get('/matriculas/lotadas',MatriculaController.listTurmasLotadas)
PessoaRouter.get('/:estudanteId/matriculas/:matriculaId', MatriculaController.find)
PessoaRouter.post('/:estudanteId/matriculas', MatriculaController.create)
PessoaRouter.post('/:estudanteId/matriculas/:matriculaId/restaura', MatriculaController.restore)
PessoaRouter.put('/:estudanteId/matriculas/:matriculaId', MatriculaController.update)
PessoaRouter.delete('/:estudanteId/matriculas/:matriculaId', MatriculaController.delete)

module.exports = PessoaRouter
