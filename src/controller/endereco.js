const {Endereco} = require ("../models")



/** Lista todas as categorias */
const all = async (req, res, next) => {
    try {
        res.send(await Endereco.findAll());
    } catch (err) {
        next (err)
    }
}

/** Consulta 1 cliente */

const one = async (req, res, next) => {
    try {
        const id = req.params.id;
        const endereco = await Endereco.findOne({
            where: {
                id: id
            }
        });

        if (!endereco)
            throw new Error("Endereço não encontrado");

        res.send(endereco);
    }
    catch (err) {
        next(err);
    }
}

/** Inserir um cliente */
const insert = async (req, res, next) => {
    try {
        res.status(201).send(await Endereco.create(req.body));
    } catch (err) {
        next (err)
    }

}

/** Alterando um cliente */ 

const update = async (req, res, next) => {
    try{
        const endereco = await Endereco.findOne ({
            where: {
                id: req.params.id
            }
        });
        if (!endereco) {
            throw new Error("Cliente não encontrado");
        }
         
        endereco.set(req.body);
        
        res.send(await endereco.save());
    
    }
    catch (err) {
        next (err)
    }
}


/**Remover um cliente */

const remove = async (req, res, next ) => {
    try {
        const endereco = await Endereco.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!endereco) {
            throw new Error ("Endereco Removido");
        }
         
        await endereco.destroy();

        res.status(204).send();
    }
    catch(err) {
        next(err);
    }
}

module.exports = {all, one, insert, update, remove};