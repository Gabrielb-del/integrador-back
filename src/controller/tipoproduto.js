const {TipoProduto} = require ("../models")



/** Lista todas as categorias */
const all = async (req, res, next) => {
    try {
        res.send(await TipoProduto.findAll());
    } catch (err) {
        next (err)
    }
}

/** Consulta 1 cliente */

const one = async (req, res, next) => {
    try {
        const id = req.params.id;
        const tipoproduto = await TipoProduto.findOne({
            where: {
                id: id
            }
        });

        if (!tipoproduto)
            throw new Error("Tipo de produto não encontrado");

        res.send(tipoproduto);
    }
    catch (err) {
        next(err);
    }
}

/** Inserir um cliente */
const insert = async (req, res, next) => {
    try {
        res.status(201).send(await TipoProduto.create(req.body));
    } catch (err) {
        next (err)
    }

}

/** Alterando um cliente */ 

const update = async (req, res, next) => {
    try{
        const tipoproduto = await TipoProduto.findOne ({
            where: {
                id: req.params.id
            }
        });
        if (!tipoproduto) {
            throw new Error("Tipo de produto não encontrado");
        }
         
        tipoproduto.set(req.body);
        
        res.send(await tipoproduto.save());
    
    }
    catch (err) {
        next (err)
    }
}


/**Remover um cliente */

const remove = async (req, res, next ) => {
    try {
        const tipoproduto = await TipoProduto.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!tipoproduto) {
            throw new Error ("Tipo de produto Removido");
        }
         
        await tipoproduto.destroy();

        res.status(204).send();
    }
    catch(err) {
        next(err);
    }
}

module.exports = {all, one, insert, update, remove};