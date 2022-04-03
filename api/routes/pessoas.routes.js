const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

PessoaRouter = Router();

PessoaRouter.get("/", PessoaController.list);
PessoaRouter.post("/", PessoaController.create);
PessoaRouter.get("/:id", PessoaController.find);
PessoaRouter.put("/:id", PessoaController.update);
PessoaRouter.delete("/:id", PessoaController.delete);

module.exports = PessoaRouter;
