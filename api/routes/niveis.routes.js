const { Router } = require("express");
const NivelController = require("../controllers/NivelController");

NivelRouter = Router();

NivelRouter.get("/", NivelController.list);
NivelRouter.post("/", NivelController.create);
NivelRouter.get("/:id", NivelController.find);
NivelRouter.put("/:id", NivelController.update);
NivelRouter.delete("/:id", NivelController.delete);

module.exports = NivelRouter;
