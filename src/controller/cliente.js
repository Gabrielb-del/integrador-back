const {Cliente} = require ("../models")



/** Lista todas as categorias */
const all = async (req, res, next) => {
    try {
        res.send(await Cliente.findAll());
    } catch (err) {
        next (err)
    }
}

/** Consulta 1 cliente */

const one = async (req, res, next) => {
    try {
        const id = req.params.id;
        const cliente = await Cliente.findOne({
            where: {
                id: id
            }
        });

        if (!cliente)
            throw new Error("Cliente não encontrado");

        res.send(cliente);
    }
    catch (err) {
        next(err);
    }
}

/** Inserir um cliente */
const insert = async (req, res, next) => {
    try {
        res.status(201).send(await Cliente.create(req.body));
    } catch (err) {
        next (err)
    }

}

/** Alterando um cliente */ 

const update = async (req, res, next) => {
    try{
        const cliente = await Cliente.findOne ({
            where: {
                id: req.params.id
            }
        });
        if (!cliente) {
            throw new Error("Cliente não encontrado");
        }
         
        cliente.set(req.body);
        
        res.send(await cliente.save());
    
    }
    catch (err) {
        next (err)
    }
}


/**Remover um cliente */

const remove = async (req, res, next ) => {
    try {
        const cliente = await Cliente.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!cliente) {
            throw new Error ("Cliente Removido");
        }
         
        await cliente.destroy();

        res.status(204).send();
    }
    catch(err) {
        next(err);
    }
}

module.exports = {all, one, insert, update, remove};