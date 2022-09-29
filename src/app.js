const express = require("express");
const cors = require("cors");

const cliente = require("./routes/cliente");
const endereco = require("./routes/endereco");
const parceiro = require("./routes/parceiro");
const produto = require("./routes/produto");
const tipoproduto = require("./routes/tipoproduto");
const auth = require("./routes/auth");

const app = new express();

app.use(cors());
app.use(express.json());

app.use(auth);
app.use("/cliente", cliente);
app.use("/endereco", endereco);
app.use("/parceiro", parceiro);
app.use("/produto", produto);
app.use("/tipoproduto", tipoproduto);

app.use((err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).send({
        error: true,
        content: err
    });
})


module.exports = app;