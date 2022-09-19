const {Tipoproduto} = require ("../models")



/** Lista todas as categorias */
const all = async (req, res, next) => {
    try {
        res.send(await Tipoproduto.findAll());
    } catch (err) {
        next (err)
    }
}

/** Consulta 1 Tipoproduto */

const one = (req, res, next) => {
    try {

    }
    catch (err) {
        next (err)
    }
}

/** Inserir um Tipoproduto */
const insert = async (req, res, next) => {
    try {
        res.send(await Tipoproduto.create(req.body));
        res.send(tipoproduto)
    } catch (err) {
        next (err)
    }

}

/** Alterando um Tipoproduto */ 

const update = async (req, res, next) => {
    try{
        const tipoproduto = await Tipoproduto.findOne ({
            where: {
                id: req.params.id
            }
        });
        if (!tipoproduto) {
            throw new Error("Tipoproduto não encontrado");
        }
         
        tipoproduto.set(req.body);
        
        res.send(await tipoproduto.save());
    
    }
    catch (err) {
        next (err)
    }
}


/**Remover um Tipoproduto */

const remove = async (req, res, next ) => {
    try {
        const tipoproduto = await tipoproduto.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!tipoproduto) {
            throw new Error ("Tipoproduto Removido");
        }
         
        await tipoproduto.destroy();

        res.status(204);
    }
    catch(err) {
        next(err);
    }
}


module.exports = {all, one, insert, update, remove};