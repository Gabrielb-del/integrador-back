const jwt = require('jsonwebtoken');
const { Cliente } = require('../models');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        var data = jwt.verify(token, "q1w2e3r4t5y6");

        const cliente = await Cliente.findByPk(data.userId);
        if (!cliente) throw new Error("Usuário inválido!")

        req.userId = data.userId;
        req.user = cliente;

        next();
    }
    catch (error) {
        next(error);
    }
}