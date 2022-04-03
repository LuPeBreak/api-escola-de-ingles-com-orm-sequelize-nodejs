const PessoasRouter = require("./pessoas.routes");

module.exports = (app) => {
  app.use("/pessoas", PessoasRouter);
};
