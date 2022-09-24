const {Parceiro} = require ("../models")



/** Lista todas as categorias */
const all = async (req, res, next) => {
    try {
        res.send(await Parceiro.findAll());
    } catch (err) {
        next (err)
    }
}

/** Consulta 1 cliente */

const one = async (req, res, next) => {
    try {
        const id = req.params.id;
        const parceiro = await Parceiro.findOne({
            where: {
                id: id
            }
        });

        if (!parceiro)
            throw new Error("Parceiro não encontrado");

        res.send(parceiro);
    }
    catch (err) {
        next(err);
    }
}

/** Inserir um cliente */
const insert = async (req, res, next) => {
    try {
        res.status(201).send(await Parceiro.create(req.body));
    } catch (err) {
        next (err)
    }

}

/** Alterando um cliente */ 

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


/**Remover um cliente */

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

        res.status(204).send();
    }
    catch(err) {
        next(err);
    }
}

module.exports = {all, one, insert, update, remove};