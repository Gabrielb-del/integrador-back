const { Sequelize, DataTypes } = require('sequelize');

const database = new Sequelize('sqlite:./db.sqlite');

const Cliente = database.define('cliente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(30),
        validate: {
            notEmpty: true,
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: DataTypes.STRING(100),
}, {});

const Parceiro = database.define('parceiro', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(60),
        validate: {
            notEmpty: true
        }
    },
    cnpj: {
        type: DataTypes.STRING(14),
        validate: {
            notEmpty: true
        }
    },
    telefone: {
        type: DataTypes.STRING(13),
        validate: {
            notEmpty: true
        }
    },
    proprietario: {
        type: DataTypes.STRING(60),
        validate: {
            notEmpty: true
        }
    },
    cpf: {
        type: DataTypes.STRING(14),
        validate: {
            notEmpty: true
        }
    }
});

const Endereco = database.define('endereco', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cep: {
        type: DataTypes.STRING(14),
        validate: {
            notEmpty: true
        }
    },
    cidade: {
        type: DataTypes.STRING(20),
        validate: {
            notEmpty: true
        }
    },
    bairro: {
        type: DataTypes.STRING(20),
        validate: {
            notEmpty: true
        }
    },
    estado: {
        types: DataTypes.STRING(2),
        validate: {
            notEmpty: true
        }
    },
    rua: {
        types: DataTypes.STRING(30),
        validate: {
            notEmpty: true
        }
    }
});

const Produto = database.define('produto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type:  DataTypes.STRING(60),
        validate: {
            notEmpty: true
        }
    },
    descricao: {
        type: DataTypes.STRING(300),
        validate: {
            notEmpty: true
        }
    },
});

const TipoProduto = database.define('tipoproduto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(60),
        validate: {
            notEmpty: true,
        }
    }
})

Parceiro.hasOne(Endereco);
Endereco.belongsTo(Parceiro);

module.exports = { database, Cliente, Parceiro, Endereco, Produto, TipoProduto };