
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

            nome: "Zeza",

            email: "zezaa@gs.com",

            password: "3221"

        });

        expect(cliente).toBeDefined();

        expect(cliente).not.toBeNull();

        expect(cliente.id).toBeDefined();

        expect(cliente.nome).toBe("Zeza");

       

    });

    test("Update", async () => {
        const cliente = await cliente.create({
                nome: "Murilo",
                email: "murilokiller@gmail.com",
                password: "murilinbalatensa"
        });

        cliente.nome = "Jose";
        cliente.email = "josekaka@gmail.com";
        cliente.password= "joseaaaak"
        await expect(cliente.save()).resolves.toBeTruthy();

        const cliente2 = await Cliente.findOne({
            where: {
                id: cliente.id
            }
        });

        expect(cliente2.nome).toBe("Nome 2 Atualizado");
    
  
 });

});
