
const { database, Cliente, Parceiro, Endereco, Produto, TipoProduto } = require('./models.js');

describe("Cliente", () => {
    beforeAll(async () => {
        await database.sync();
    });

    test("List", async () => {
        await Cliente.bulkCreate([
            {
                nome: "Zezo",
                email: "zezo@gs.com",
                password: "321"
            },
            {
                nome: "Pablin",
                email: "pablo34@gmail.com",
                password: "pablo123"
            },
            {
                nome: "Murilo",
                email: "murilokiller@gmail.com",
                password: "murilinbalatensa"
            }
        ]);

        const cliente = await Cliente.findAll();

        expect(cliente.length).toBe(3);
        expect(cliente[0].nome).toBe("Zezo");
    });

    test("Insert", async () => {

        const cliente = await Cliente.create({

            nome: "Zezo",

            email: "zezaa@gs.com",

            password: "3221"

        });

        expect(cliente).toBeDefined();

        expect(cliente).not.toBeNull();
        expect(cliente.id).toBeDefined();
        expect(cliente.nome).toBe("Zezo");

        // Inserindo com os dados brancos
        await expect(Cliente.create({
            id: cliente.id,
            nome: "",
            email: "",
            password: ""
        })).rejects.toThrow();

        await expect(Cliente.create({
            id: cliente.id,
            nome: "",
            email: "xxx",
            password: "xxx",
        })).rejects.toThrow();

        await expect(Cliente.create({
            id: cliente.id,
            nome: "xxx",
            email: "",
            password: "xxx",
        })).rejects.toThrow();

        await expect(Cliente.create({
            id: cliente.id,
            nome: "xxx",
            email: "xxx",
            password: "",
        })).rejects.toThrow();

        // Inserindo sem nenhuma informação
        await expect(Cliente.create({})).rejects.toThrow();

    });

    test("Update", async () => {
        const cliente = await Cliente.create({
            nome: "Gabriel",
            email: "gabriel@gg.com",
            password: "6542"
        });

        cliente.nome = "Priscila";

        await expect(cliente.save()).resolves.toBeDefined();

        const cliente2 = await Cliente.findOne({
            where: {
                id: cliente.id
            }
        });

        expect(cliente2.name).toBe(cliente.name);
    });

    test("Delete", async () => {
        const cliente = await Cliente.create({

            nome: "Gabriel",
            email: "gabriel@gga.com",
            password: "6542"

        });

        await expect(cliente.destroy()).resolves.toBeTruthy();
    });
});

describe("Endereco", () => {
    beforeAll(async () => {
        await database.sync();
    });

    test("List", async () => {
        await Endereco.bulkCreate([
            {
                cep: "16984-732",
                estado: "SP",
                cidade: "Bauru",
                bairro: "Pq são joão",
                rua: "Rua Itacuruca"
            },
            {
                cep: "17042-350",
                estado: "BA",
                cidade: "Salvador",
                bairro: "Bela Vista",
                rua: "Bernardino"
            },
            {
                cep: "17054-420",
                estado: "MG",
                cidade: "Santo André",
                bairro: "Santo Antonio",
                rua: "Rua do Ipiranga"
            }
        ]);

        const endereco = await Endereco.findAll();

        expect(endereco.length).toBe(3);
        expect(endereco[0].estado).toBe("SP");
    });

    test("Insert", async () => {

        const endereco = await Endereco.create({

            cep: "16984-732",
            estado: "SP",
            cidade: "Bauru",
            bairro: "Pq são joão",
            rua: "Rua Itacuruca"

        });

        expect(endereco).toBeDefined();

        expect(endereco).not.toBeNull();
        expect(endereco.id).toBeDefined();
        expect(endereco.cep).toBe("16984-732");

        // Inserindo com os dados brancos
        await expect(Endereco.create({
            id: endereco.id,
            cep: "",
            estado: "",
            cidade: "",
            bairro: "",
            rua: ""
        })).rejects.toThrow();

        await expect(Endereco.create({
            id: endereco.id,
            cep: "",
            estado: "xxx",
            cidade: "xxx",
            bairro: "xxx",
            rua: "xxx"
        })).rejects.toThrow();

        await expect(Endereco.create({
            id: endereco.id,
            cep: "xxx",
            estado: "",
            cidade: "xxx",
            bairro: "xxx",
            rua: "xxx"
        })).rejects.toThrow();

        await expect(Endereco.create({
            id: endereco.id,
            cep: "xxx",
            estado: "xxx",
            cidade: "",
            bairro: "xxx",
            rua: "xxx"
        })).rejects.toThrow();

        await expect(Endereco.create({
            id: endereco.id,
            cep: "xxx",
            estado: "xxx",
            cidade: "xxx",
            bairro: "",
            rua: "xxx"
        })).rejects.toThrow();

        await expect(Endereco.create({
            id: endereco.id,
            cep: "xxx",
            estado: "xxx",
            cidade: "xxx",
            bairro: "xxx",
            rua: ""
        })).rejects.toThrow();

        // Inserindo sem nenhuma informação
        await expect(Endereco.create({})).rejects.toThrow();

    });

    test("Update", async () => {
        const endereco = await Endereco.create({
            cep: "17042-350",
            estado: "BA",
            cidade: "Salvador",
            bairro: "Bela Vista",
            rua: "Bernardino"
        });

        endereco.cep = "17023-654";

        await expect(endereco.save()).resolves.toBeDefined();

        const endereco2 = await Endereco.findOne({
            where: {
                id: endereco.id
            }
        });

        expect(endereco2.cep).toBe(endereco.cep);
    });

    test("Delete", async () => {
        const endereco = await Endereco.create({

            cep: "17042-350",
            estado: "BA",
            cidade: "Salvador",
            bairro: "Bela Vista",
            rua: "Bernardino"

        });

        await expect(endereco.destroy()).resolves.toBeTruthy();
    });
});

describe("Produto", () => {
    beforeAll(async () => {
        await database.sync();
    });

    test("List", async () => {
        await Produto.bulkCreate([
            {
                name: "Tênis",
                descricao: "tenis muito resistente, tamoanho 41"
            },
            {
                name: "Camisa",
                descricao: "camisa tamanho G"
            },
            {
                name: "Óculos",
                descricao: "Óculos de sol perfeito para praia"
            }
        ]);

        const produto = await Produto.findAll();

        expect(produto.length).toBe(3);
        expect(produto[0].name).toBe("Tênis");
    });

    test("Insert", async () => {

        const produto = await Produto.create({

            name: "Tênis",
            descricao: "tenis muito resistente, tamoanho 41"

        });

        expect(produto).toBeDefined();

        expect(produto).not.toBeNull();
        expect(produto.id).toBeDefined();
        expect(produto.name).toBe("Tênis");

        // Inserindo com os dados brancos
        await expect(Produto.create({
            id: produto.id,
            name: "",
            descricao: ""
        })).rejects.toThrow();

        await expect(Produto.create({
            id: produto.id,
            name: "xxx",
            descricao: ""
        })).rejects.toThrow();

        await expect(Produto.create({
            id: produto.id,
            name: "",
            descricao: "xxx"
        })).rejects.toThrow();

        // Inserindo sem nenhuma informação
        await expect(Produto.create({})).rejects.toThrow();

    });

    test("Update", async () => {
        const produto = await Produto.create({
            name: "Tênis",
            descricao: "tenis muito resistente, tamoanho 41"
        });

        produto.name = "Camisa";

        await expect(produto.save()).resolves.toBeDefined();

        const produto2 = await Produto.findOne({
            where: {
                id: produto.id
            }
        });

        expect(produto2.cep).toBe(produto.cep);
    });

    test("Delete", async () => {
        const produto = await Produto.create({

            name: "Tênis",
            descricao: "tenis muito resistente, tamoanho 41"

        });

        await expect(produto.destroy()).resolves.toBeTruthy();
    });
});

describe("TipoProduto", () => {
    beforeAll(async () => {
        await database.sync();
    });

    test("List", async () => {
        await TipoProduto.bulkCreate([
            {
                nome: "Tênis",
            },
            {
                nome: "Camisa",
            },
            {
                nome: "Óculos",
            }
        ]);

        const tipoproduto = await TipoProduto.findAll();

        expect(tipoproduto.length).toBe(3);
        expect(tipoproduto[0].nome).toBe("Tênis");
    });

    test("Insert", async () => {

        const tipoproduto = await TipoProduto.create({

            nome: "Tênis",

        });

        expect(tipoproduto).toBeDefined();

        expect(tipoproduto).not.toBeNull();
        expect(tipoproduto.id).toBeDefined();
        expect(tipoproduto.nome).toBe("Tênis");

        // Inserindo com os dados brancos
        await expect(TipoProduto.create({
            id: tipoproduto.id,
            nome: "",
        })).rejects.toThrow();

        // Inserindo sem nenhuma informação
        await expect(TipoProduto.create({})).rejects.toThrow();

    });

    test("Update", async () => {
        const tipoproduto = await TipoProduto.create({
            nome: "Tênis",
            
        });

        tipoproduto.nome = "Camisa";

        await expect(tipoproduto.save()).resolves.toBeDefined();

        const tipoproduto2 = await TipoProduto.findOne({
            where: {
                id: tipoproduto.id
            }
        });

        expect(tipoproduto2.cep).toBe(tipoproduto.cep);
    });

    test("Delete", async () => {
        const tipoproduto = await TipoProduto.create({

            nome: "Tênis",
        });

        await expect(tipoproduto.destroy()).resolves.toBeTruthy();
    });
});

describe ("Parceiro", () =>{
    test("List", async () => {
        await Parceiro.bulkCreate([
            {
                nome: "Murilo",
                cnpj: "123456789",
                telefone: "123456789",
                proprietario: "Leonel",
                cpf:"123456789"
            },
            {
                nome: "Mane",
                cnpj: "234567891",
                telefone: "234567891",
                proprietario: "Jose",
                cpf:"234567891"
            },
            {
                nome: "Kaka",
                cnpj: "345678912",
                telefone: "345678912",
                proprietario: "Lala",
                cpf:"345678912"
            },
            {
                nome: "Zezinho",
                cnpj: "456789123",
                telefone: "456789123",
                proprietario: "Zzzz",
                cpf:"456789123"
            },

        ])

        const parceiro = await Parceiro.findAll();

        expect(parceiro.length).toBe(4);

    })
    
    test("Insert", async () => {
        const parceiro = await Parceiro.create({
                nome: "Baratinha",
                cnpj: "567891234",
                telefone: "567891234",
                proprietario: "tinha",
                cpf:"567891234"
        });
        expect(parceiro.id).toBeDefined();

        // Inserindo com os dados brancos
        await expect(Parceiro.create({
            id: parceiro.id,
            nome: "",
            email: "",
            password: ""
        })).rejects.toThrow();

        await expect(Parceiro.create({
            id: parceiro.id,
            nome: "",
            email: "xxx",
            password: "xxx",
        })).rejects.toThrow();

        await expect(Parceiro.create({
            id: parceiro.id,
            nome: "xxx",
            email: "",
            password: "xxx",
        })).rejects.toThrow();

        await expect(Parceiro.create({
            id: parceiro.id,
            nome: "xxx",
            email: "xxx",
            password: "",
        })).rejects.toThrow();

        // Inserindo sem nenhuma informação
        await expect(Parceiro.create({})).rejects.toThrow();

    

    });
    test("Update", async () => {
        const parceiro = await Parceiro.create({
            nome: "Baratinha",
            cnpj: "568888888",
            telefone: "567891234",
            proprietario: "tinha",
            cpf:"567891234"
        });

        parceiro.nome = "Jose";

        await expect(parceiro.save()).resolves.toBeDefined();

        const parceiro2 = await Parceiro.findOne({
            where: {
                id: parceiro.id
            }
        });

        expect(parceiro2.cep).toBe(parceiro.cep);
    });

    test("Delete", async () => {
        const parceiro = await Parceiro.create({

            nome: "Baratinha",
            cnpj: "568888888",
            telefone: "567891234",
            proprietario: "tinha",
            cpf:"567891234"
        });

        await expect(parceiro.destroy()).resolves.toBeTruthy();
    });



})