
const {database, Cliente, Parceiro, Endereco, Produto, TipoProduto } = require('./models.js');

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




})