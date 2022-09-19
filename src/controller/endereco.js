const {Endereco} = require ("../models")



/** Lista todas as categorias */
const all = async (req, res, next) => {
    try {
        res.send(await Endereco.findAll());
    } catch (err) {
        next (err)
    }
}

/** Consulta 1 Endereco */

const one = (req, res, next) => {
    try {

    }
    catch (err) {
        next (err)
    }
}

/** Inserir um Endereco */
const insert = async (req, res, next) => {
    try {
        res.send(await Endereco.create(req.body));
        res.send(endereco)
    } catch (err) {
        next (err)
    }

}

/** Alterando um Endereco */ 

const update = async (req, res, next) => {
    try{
        const endereco = await Endereco.findOne ({
            where: {
                id: req.params.id
            }
        });
        if (!endereco) {
            throw new Error("Endereco não encontrado");
        }
         
        endereco.set(req.body);
        
        res.send(await endereco.save());
    
    }
    catch (err) {
        next (err)
    }
}


/**Remover um Endereco */

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

        res.status(204);
    }
    catch(err) {
        next(err);
    }
}

module.exports = {all, one, insert, update, remove};