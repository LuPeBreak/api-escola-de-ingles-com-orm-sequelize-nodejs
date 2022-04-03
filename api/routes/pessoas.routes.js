const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

PessoaRouter = Router();

PessoaRouter.get("/", PessoaController.list);
PessoaRouter.post("/", PessoaController.create);
PessoaRouter.get("/:id", PessoaController.find);
PessoaRouter.put("/:id", PessoaController.update);
PessoaRouter.delete("/:id", PessoaController.delete);

//Matriculas
PessoaRouter.get("/:estudanteId/matriculas", PessoaController.listMatriculas);
PessoaRouter.post("/:estudanteId/matriculas", PessoaController.createMatricula);
PessoaRouter.get("/:estudanteId/matriculas/:matriculaId", PessoaController.findMatricula);
PessoaRouter.put("/:estudanteId/matriculas/:matriculaId", PessoaController.updateMatricula);
PessoaRouter.delete("/:estudanteId/matriculas/:matriculaId", PessoaController.deleteMatricula);

module.exports = PessoaRouter;
