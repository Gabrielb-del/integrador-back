const { Sequelize, DataTypes } = require('sequelize');

const DATABASE = process.env.NODE_ENV == "test" ? "sqlite::memory:" : (process.env.NODE_ENV == "production" ? process.env.DATABASE_URL: "sqlite:./database.sqlite");
const database = new Sequelize(DATABASE, {logging: false});

const Cliente = database.define('cliente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
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
        type: DataTypes.STRING(2),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    rua: {
        type: DataTypes.STRING(30),
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

TipoProduto.hasMany(Produto);
Produto.belongsTo(TipoProduto);

module.exports = { database, Cliente, Parceiro, Endereco, Produto, TipoProduto };