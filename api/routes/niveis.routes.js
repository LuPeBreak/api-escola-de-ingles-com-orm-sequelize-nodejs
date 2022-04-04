const { Router } = require('express')
const NivelController = require('../controllers/NivelController')

const NivelRouter = Router()

NivelRouter.get('/', NivelController.list)
NivelRouter.post('/', NivelController.create)
NivelRouter.post('/:id/restaura', NivelController.restore)
NivelRouter.get('/:id', NivelController.find)
NivelRouter.put('/:id', NivelController.update)
NivelRouter.delete('/:id', NivelController.delete)

module.exports = NivelRouter
