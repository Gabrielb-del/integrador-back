const {Parceiro} = require ("../models")



/** Lista todas as categorias */
const all = async (req, res, next) => {
    try {
        res.send(await Parceiro.findAll());
    } catch (err) {
        next (err)
    }
}

/** Consulta 1 Parceiro */

const one = (req, res, next) => {
    try {

    }
    catch (err) {
        next (err)
    }
}

/** Inserir um Parceiro */
const insert = async (req, res, next) => {
    try {
        res.send(await Parceiro.create(req.body));
        res.send(Parceiro)
    } catch (err) {
        next (err)
    }

}

/** Alterando um Parceiro */ 

const update = async (req, res, next) => {
    try{
        const parceiro = await Parceiro.findOne ({
            where: {
                id: req.params.id
            }
        });
        if (!parceiro) {
            throw new Error("Parceiro não encontrado");
        }
         
        parceiro.set(req.body);
        
        res.send(await parceiro.save());
    
    }
    catch (err) {
        next (err)
    }
}


/**Remover um Parceiro */

const remove = async (req, res, next ) => {
    try {
        const parceiro = await Parceiro.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!parceiro) {
            throw new Error ("Parceiro Removido");
        }
         
        await parceiro.destroy();

        res.status(204);
    }
    catch(err) {
        next(err);
    }
}


module.exports = {all, one, insert, update, remove};