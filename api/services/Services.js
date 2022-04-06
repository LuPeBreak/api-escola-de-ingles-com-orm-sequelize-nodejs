const database = require('../models')

class Services {
  constructor(nomeDoModelo){
    this.nomeDoModelo = nomeDoModelo
  }

  async pegaTodosOsRegistros(where){
    return database[this.nomeDoModelo].findAll({where:{...where}})
  }
  async pegaUmRegistro(id){
    return database[this.nomeDoModelo].findOne({where:{id:Number(id)}})
  }
  async criaRegistro(dados,transacao={}){
    return database[this.nomeDoModelo].create(dados,transacao)
  }
  async atualizaRegistro(dados,id,transacao={}){
    return database[this.nomeDoModelo].update(dados,{where:{id:Number(id)}},transacao)
  }
  async atualizaRegistroEPega(dados,id,transacao={}){
    await database[this.nomeDoModelo].update(dados,{where:{id:Number(id)}},transacao)
    return database[this.nomeDoModelo].findOne({where:{id:Number(id)}},transacao)
  }
  async atualizaRegistrosEPega(dados,where,transacao={}){
    await database[this.nomeDoModelo].update(dados,{where:{...where}},transacao)
    return database[this.nomeDoModelo].findOne({where:{...where}},transacao)
  }
  async atualizaRegistros(dados,where,transacao={}){
    return database[this.nomeDoModelo].update(dados,{where:{...where}},transacao)
  }
  async deletaRegistro(id,transacao={}){
    return database[this.nomeDoModelo].destroy({where:{id:Number(id)}},transacao)
  }
  async deletaRegistros(where,transacao={}){
    return database[this.nomeDoModelo].destroy({where:{...where}},transacao)
  }
  async restauraRegistro(id,transacao={}){
    return database[this.nomeDoModelo].restore({where:{id:Number(id)}},transacao)
  }
  async restauraRegistros(where,transacao={}){
    return database[this.nomeDoModelo].restore({where:{...where}},transacao)
  }
  async encontraEContaRegistros(where={},agregadores){
    return database[this.nomeDoModelo].findAndCountAll({where:where},agregadores)
  }

}

module.exports = Services