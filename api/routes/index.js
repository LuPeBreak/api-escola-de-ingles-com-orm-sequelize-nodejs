const PessoaRouter = require("./pessoas.routes");
const NivelRouter = require("./niveis.routes");
const TurmaRouter = require("./turmas.routes");


module.exports = (app) => {
  app.use("/pessoas", PessoaRouter);
  app.use("/niveis", NivelRouter);
  app.use("/turmas", TurmaRouter);
};
