const Services = require('./Services')
const database = require('../models')

class MatriculasServices extends Services{
  constructor(){
    super('Matriculas')
    this.Pessoas = new Services('Pessoas')
  }

  // metodos especificos de matriculas

  async pegaUmRegistro(id,estudante_id){
    return database[this.nomeDoModelo].findOne({where:{id:Number(id),estudante_id:Number(estudante_id)}})
  }
  
}

module.exports = MatriculasServices