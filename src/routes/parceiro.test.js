const request = require("supertest");
const { database, Parceiro } = require("../models");
const app = require("./../app");

describe("Routes", () => {
    beforeAll(async () => {
        await database.sync();
    });

    describe("parceiro", () => {
        test("GET /", async () => {
            const response = await request(app)
                .get("/parceiro")
                .expect(200);
        })
        test("POST /", async () => {
            const response = await request(app)
                .post('/parceiro')
                .send({
                    nome:"KAKAK",
                    cnpj:"123456789",
                    telefone:"123456789",
                    proprietario:"xablau",
                    cpf:"123456789"
                })
                .expect(201);

            await request(app)
                .post('/parceiro')
                .send({})
                .expect(500);
        })
        test("GET /:id", async () => {
            const cat = await Parceiro.create({
                    nome:"xalalau",
                    cnpj:"9874563210",
                    telefone:"142536987",
                    proprietario:"xalalinha",
                    cpf:"7412589630"
            });

            const response = await request(app)
                .get(`/parceiro/${cat.id}`)
                .expect(200);

            const response2 = await request(app)
                .get("/parceiro/1000")
                .expect(500);
        })
        test("POST /:id", async () => {
            const cat = await Parceiro.create({
                nome:"qwerty",
                cnpj:"152368428",
                telefone:"123456789",
                proprietario:"zetsub",
                cpf:"142888753"
            });

            const response = await request(app)
                .post(`/parceiro/${cat.id}`)
                .send({
                nome:"qqqqol",
                cnpj:"152361118",
                telefone:"188856789",
                proprietario:"zetsubzaaao",
                cpf:"14288111113"
                })
                .expect(200);
        })
        test("DELETE /:id", async () => {
            const cat = await Parceiro.create({
                nome:"qqqqol",
                cnpj:"152361118",
                telefone:"188856789",
                proprietario:"zetsubzaaao",
                cpf:"14288111113"
            });
            const response = await request(app)
                .delete(`/parceiro/${cat.id}`)
                .expect(204);
        })

    });

});