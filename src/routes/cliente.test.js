const request = require("supertest");
const { database, Cliente } = require("../models");
const app = require("./../app");

describe("Routes", () => {
    beforeAll(async () => {
        await database.sync();
    });

    describe("cliente", () => {
        test("GET /", async () => {
            const response = await request(app)
                .get("/cliente")
                .expect(200);
        })
        test("POST /", async () => {
            const response = await request(app)
                .post('/cliente')
                .send({
                    nome: "Nome teste",
                    email: "email@test.com",
                    password: "teste"
                })
                .expect(201);

            await request(app)
                .post('/cliente')
                .send({})
                .expect(500);
        })
        test("GET /:id", async () => {
            const cat = await Cliente.create({
                nome: "teste",
                email: "teste@tes.com",
                password: "123"
            });

            const response = await request(app)
                .get(`/cliente/${cat.id}`)
                .expect(200);

            const response2 = await request(app)
                .get("/cliente/1000")
                .expect(500);
        })
        test("POST /:id", async () => {
            const cat = await Cliente.create({
                nome: "teste 2",
                email: "teste2@te2.com",
                password: "test2"
            });

            const response = await request(app)
                .post(`/cliente/${cat.id}`)
                .send({
                    nome: "Outro nome",
                    email: "email@teste.com",
                    password: "teste"
                })
                .expect(200);
        })
        test("DELETE /:id", async () => {
            const cat = await Cliente.create({
                nome: "Nome teste 2",
                email: "teste2@te2.com",
                password: "test2"
            });
            const response = await request(app)
                .delete(`/cliente/${cat.id}`)
                .expect(204);
        })

    });

});