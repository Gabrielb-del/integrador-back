const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Cliente } = require('../models');

const me = async (req, res, next) => { 
    try {
        const cliente = await Cliente.findOne({
            where: {
                id: req.id
            }
        });

        if (!cliente)
            res.status(401).send();
        else
            res.send(cliente);
    }
    catch (error) {
        next(error);
    }
}
const login = async (req, res, next) => { 
    try {
        const { email, password } = req.body;

        if (!email)
            throw new Error("Usuário ou senha inválidos!");

        const cliente = await Cliente.findOne({ where: { email } });

        if (!cliente)
            throw new Error("Usuário ou senha inválidos!");

        if (!await bcrypt.compare(password, cliente.password)) 
            throw new Error("Usuário ou senha inválidos!");


        const token = jwt.sign({
            clienteId: cliente.id
        }, "q1w2e3r4t5y6", {
            expiresIn: "7d"
        });

        res.send({ cliente, token });
    } catch (error) {
        next(error);
    }

}

const register = async (req, res, next) => { 
    try {
        const data = req.body;
       
        if (data.password)
            data.password = await bcrypt.hash(data.password, 10);

    

        const cliente = await Cliente.create(data);

        res.send(cliente);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
 }

 module.exports = { me, login, register }