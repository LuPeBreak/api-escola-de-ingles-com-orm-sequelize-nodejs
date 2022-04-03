const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

PessoaRouter = Router();

PessoaRouter.get("/", PessoaController.list);
PessoaRouter.get("/:id", PessoaController.find);

module.exports = PessoaRouter;
