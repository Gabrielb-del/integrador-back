const {Produto} = require ("../models")



/** Lista todas as categorias */
const all = async (req, res, next) => {
    try {
        res.send(await Produto.findAll());
    } catch (err) {
        next (err)
    }
}

/** Consulta 1 Produto */

const one = (req, res, next) => {
    try {

    }
    catch (err) {
        next (err)
    }
}

/** Inserir um Produto */
const insert = async (req, res, next) => {
    try {
        res.send(await Produto.create(req.body));
        res.send(produto)
    } catch (err) {
        next (err)
    }

}

/** Alterando um Produto */ 

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


/**Remover um Produto */

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

        res.status(204);
    }
    catch(err) {
        next(err);
    }
}


module.exports = {all, one, insert, update, remove};