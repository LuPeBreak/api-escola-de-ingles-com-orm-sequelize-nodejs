const { Router } = require("express");
const TurmaController = require("../controllers/TurmaController");

TurmaRouter = Router();

TurmaRouter.get("/", TurmaController.list);
TurmaRouter.post("/", TurmaController.create);
TurmaRouter.get("/:id", TurmaController.find);
TurmaRouter.put("/:id", TurmaController.update);
TurmaRouter.delete("/:id", TurmaController.delete);

module.exports = TurmaRouter;
