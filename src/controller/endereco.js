const {Endereco} = require ("../models")



/** Lista todos os Endereços */
const all = async (req, res, next) => {
    try {
        res.send(await Endereco.findAll());
    } catch (err) {
        next (err)
    }
}

/** Consulta 1 endereco */

const one = (req, res, next) => {
    try {

    }
    catch (err) {
        next (err)
    }
}

/** Inserir um endereco */
const insert = async (req, res, next) => {
    try {
        res.send(await Endereco.create(req.body));
        res.send(endereco)
    } catch (err) {
        next (err)
    }

}

/** Alterando um endereco */ 

const update = async (req, res, next) => {
    try{
        const endereco = await Endereco.findOne ({
            where: {
                id: req.params.id
            }
        });
        if (!endereco) {
            throw new Error("Endereço não encontrado");
        }
         
        endereco.set(req.body);
        
        res.send(await endereco.save());
    
    }
    catch (err) {
        next (err)
    }
}


/**Remover um endereco */

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
         
        await cliente.destroy();

        res.status(204);
    }
    catch(err) {
        next(err);
    }
}

module.exports = { all, one, insert, update, remove };