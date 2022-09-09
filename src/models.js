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
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {});

const Parceiro = database.define('parceiro', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: true,
          
        }
    },
    cnpj: {
        type: DataTypes.STRING(14),
        allowNull: false,
        validate: {
            notEmpty: true,
           
        }
    },
    telefone: {
        type: DataTypes.STRING(13),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    proprietario: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
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
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    cidade: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    bairro: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    estado: {
        types: DataTypes.STRING(2),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    rua: {
        types: DataTypes.STRING(30),
        allowNull: false,
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
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    descricao: {
        type: DataTypes.STRING(300),
        allowNull: false,
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
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
});

Parceiro.hasMany(Produto);
Produto.belongsTo(Parceiro);

Endereco.hasOne(Parceiro);
Parceiro.belongsTo(Endereco);

Produto.hasMany(TipoProduto);
TipoProduto.belongsTo(Produto);

module.exports = { database, Cliente, Parceiro, Endereco, Produto, TipoProduto };