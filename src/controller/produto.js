const {Produto} = require ("../models")



/** Lista todas os produtos */
const all = async (req, res, next) => {
    try {
        res.send(await Produto.findAll());
    } catch (err) {
        next (err)
    }
}

/** Consulta 1 cliente */

const one = async (req, res, next) => {
    try {
        const id = req.params.id;
        const produto = await Produto.findOne({
            where: {
                id: id
            }
        });

        if (!produto)
            throw new Error("Produto não encontrado");

        res.send(cliente);
    }
    catch (err) {
        next(err);
    }
}

/** Inserir um cliente */
const insert = async (req, res, next) => {
    try {
        res.status(201).send(await Produto.create(req.body));
    } catch (err) {
        next (err)
    }

}

/** Alterando um cliente */ 

const update = async (req, res, next) => {
    try{
        const produto = await Produto.findOne ({
            where: {
                id: req.params.id
            }
        });
        if (!produto) {
            throw new Error("Produto não encontrado");
        }
         
        produto.set(req.body);
        
        res.send(await produto.save());
    
    }
    catch (err) {
        next (err)
    }
}


/**Remover um cliente */

const remove = async (req, res, next ) => {
    try {
        const produto = await Produto.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!produto) {
            throw new Error ("Produto Removido");
        }
         
        await produto.destroy();

        res.status(204).send();
    }
    catch(err) {
        next(err);
    }
}

module.exports = {all, one, insert, update, remove};