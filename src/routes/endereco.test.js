const request = require("supertest");
const { database, Endereco } = require("../models");
const app = require("./../app");

describe("Routes", () => {
    beforeAll(async () => {
        await database.sync();
    });

    describe("endereco", () => {
        test("GET /", async () => {
            const response = await request(app)
                .get("/endereco")
                .expect(200);
        })
        test("POST /", async () => {
            const response = await request(app)
                .post('/endereco')
                .send({
                    cep:"123456789",
                    cidade:"bauru",
                    bairro:"bela vista",
                    estado:"SP",
                    rua:"Jose gonsalves"
                })
                .expect(201);

            await request(app)
                .post('/endereco')
                .send({})
                .expect(500);
        })
        test("GET /:id", async () => {
            const cat = await Endereco.create({
                cep:"1234567890",
                cidade:"Jau",
                bairro:"TEste",
                estado:"SP",
                rua:"Jose kakak"
            });

            const response = await request(app)
                .get(`/endereco/${cat.id}`)
                .expect(200);

            const response2 = await request(app)
                .get("/endereco/1000")
                .expect(500);
        })
        test("POST /:id", async () => {
            const cat = await Endereco.create({
                    cep:"13123456789",
                    cidade:"test2",
                    bairro:"test2",
                    estado:"SP",
                    rua:"test2"
            });

            const response = await request(app)
                .post(`/endereco/${cat.id}`)
                .send({
                    cep:"12345678955",
                    cidade:"bariri",
                    bairro:"MElhor vista",
                    estado:"SP",
                    rua:"Josias"
                })
                .expect(200);
        })
        test("DELETE /:id", async () => {
            const cat = await Endereco.create({
                cep:"12345678955",
                cidade:"bariri",
                bairro:"MElhor vista",
                estado:"SP",
                rua:"Josias"
            });
            const response = await request(app)
                .delete(`/endereco/${cat.id}`)
                .expect(204);
        })

    });

});