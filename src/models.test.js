const { DESCRIBE } = require('sequelize/types/query-types');
const {database, Cliente, Parceiro, Endereco, Produto, TipoProduto } = require('./models.js');

DESCRIBE("Cliente", () => {
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
        expect(cliente[0].nome).toBe("Zezo")
    });

    test("Insert", async () => {
        const cliente = await Cliente.create({
            nome: "Zezo",
            email: "zezo@gs.com",
            password: "321"
        });

        expect(cliente).toBeDefined();
        expect(cliente).not.toBeNull();
        expect(cliente.id).toBeDefined();
        expect(cliente.nome).toBe("Zezo");
        
    })



});