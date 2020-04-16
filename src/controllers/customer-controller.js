'use strict';

const ValidationContract = require('../validators/fluent-validator'); 
const repository = require('../repositories/customer-repository');
const md5 = require('md5');

const emailService = require('../services/email-service');

exports.get = async(req,res,next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'erro ao realizar a busca de customer'
        });
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'E-mail invalido');
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 6 caracteres');

    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        try {
            emailService.send(req.body.email, 'Bem vindo ao sistema de produtos', global.EMAIL_TMPL.replace('{0}',req.body.name));

        } catch (error) {
            console.log(error);
        }


        res.status(201).send({
            "message" : "Usuario criado com sucesso"
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisicaçāo',
            error: error
        });
    }
};
