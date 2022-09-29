const request = require("supertest");
const { database, Cliente } = require("../models");
const app = require("./../app");


let token;

describe("Routes", () => {
    beforeAll(async () => {
        await database.sync();

        await request(app)
            .post('/register')
            .send({
                nome: "Nome teste",
                email: "email@test.com",
                password: "teste"
            });

        const loginResponse = await request(app)
            .post('/login')
            .send({
                email: "email@test.com",
                password: "teste"
            });

        token = loginResponse.body.token;
    });

    describe("cliente", () => {
        test("GET /", async () => {
            const response = await request(app)
                .get("/cliente")
                .set('Authorization', token)
                .expect(200);
        })


        test("POST /", async () => {
            const response = await request(app)
                .post('/cliente')
                .set('Authorization', token)
                .send({
                    nome: "Nome teste",
                    email: "email2@test.com",
                    password: "teste"
                })
                .expect(201);

            await request(app)
                .post('/cliente')
                .set('Authorization', token)
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
                .set('Authorization', token)
                .expect(200);

            const response2 = await request(app)
                .get("/cliente/1000")
                .set('Authorization', token)
                .expect(500);
        })
        test("POST /:id", async () => {
            const cat = await Cliente.create({
                nome: "teste 2",
                email: "teste22@te2.com",
                password: "test2"
            });

            const response = await request(app)
                .post(`/cliente/${cat.id}`)
                .set('Authorization', token)
                .send({
                    nome: "Outro nome",
                    email: "email3@teste.com",
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
                .set('Authorization', token)
                .expect(204);
        })

    });

});