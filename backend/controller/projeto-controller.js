const HttpError = require('../models/httperror');
const { validationResult } = require('express-validator');
const uuid = require('uuid/v4');
const Projeto = require('../models/projetos');
const mongoose = require('mongoose');
const fs = require('fs');

const createProjeto = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Algum dado do formulário está incorreto', 422))
  }
  const { nome, tecnologia, link } = req.body;


  const createdProjeto = new Projeto({
    nome,
    tecnologia,
    link,
    imagem: req.file.path
  })
  if (!createdProjeto) {
    const error = new HttpError('Projeto não foi criado, tente de novo!', 500);
    return next(error);
  }
  try {
    await createdProjeto.save();
  } catch (err) {
    const error = new HttpError(
      'Criação de projeto falhou, tente mais tarde.',
      500
    );
    return next(error);
  }
  res.status(201).json({ projeto: createProjeto });
}

const getProjetos = async (req, res, next) => {

  let projetos;

  try {
    projetos = await Projeto.find();
  } catch (err) {
    const error = new HttpError('Busca por projetos falhou', 500);
    return next(error);
  }

  if (!projetos || projetos.length === 0) {
    const error = new HttpError('Não existe nenhum projeto cadastrado', 404);
    return next(error);
  }
  res.status(200).json({ projetos: projetos.map(projeto => projeto.toObject({ getters: true })) });

}

const deleteProjeto = async (req, res, next) => {
  const projetoId = req.params.pid;
  let projeto;
  try {
    projeto = await Projeto.findById(projetoId);
  } catch (err) {
    let error = new HttpError('Não foi encontrada um projeto com esse id')
    return next(error);
  }

  try {
    await projeto.remove();
  } catch (err) {
    let error = new HttpError("A mensagem não pode ser deletada", 500);
    return next(error);
  }

  const imagePath = projeto.image;
  fs.unlink(imagePath, err => {
    console.log(err);
  })
  res.status(200).json({ message: "Mensagem deletada!" });
}

const updateProjeto = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Algum dado do formulário está inválido', 422))
  }

  const { nome, link, tecnologia } = req.body;
  let projetoId = req.params.pid;

  let projeto;
  try {
    projeto = await Projeto.findById(projetoId);
  } catch (err) {
    const error = new HttpError('Nenhum projeto com esse ID foi encontrado', 500);
    return next(error);
  }

  projeto.nome = nome;
  projeto.link = link;
  projeto.tecnologia=tecnologia;

  try{
    await projeto.save();
  }catch(err){
    const error = new HttpError('Não foi possível efetuar a operação',500);
    return next(error);
  }

  res.status(200).json({projeto:projeto.toObject({getters:true})})
}
exports.createProjeto = createProjeto;
exports.getProjetos = getProjetos;
exports.deleteProjeto = deleteProjeto;
exports.updateProjeto = updateProjeto;