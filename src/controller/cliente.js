const { Cliente } = require("../models")
const bcrypt = require('bcrypt')



/** Lista todas as categorias */
const all = async (req, res, next) => {
    try {
        res.send(await Cliente.findAll());
    } catch (err) {
        next(err)
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
        const data = req.body;

        if (data.password)
            data.password = await bcrypt.hash(data.password, 10);

        const cliente = await Cliente.create(data);
        res.status(201).send(cliente);
    } catch (err) {
        next(err)
    }

}

/** Alterando um cliente */

const update = async (req, res, next) => {
    try {
        const cliente = await Cliente.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!cliente) {
            throw new Error("Cliente não encontrado");
        }

        const data = req.body;

        if (data.password)
            data.password = await bcrypt.hash(data.password, 10);

        cliente.set(data);

        res.send(await cliente.save());

    }
    catch (err) {
        next(err)
    }
}


/**Remover um cliente */

const remove = async (req, res, next) => {
    try {
        const cliente = await Cliente.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!cliente) {
            throw new Error("Cliente Removido");
        }

        await cliente.destroy();

        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
}

module.exports = { all, one, insert, update, remove };