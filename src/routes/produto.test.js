const request = require("supertest");
const { database, Produto } = require("../models");
const app = require("../app");

describe("Routes", () => {
    beforeAll(async () => {
        await database.sync();
    });

    describe("produto", () => {
        test("GET /", async () => {
            const response = await request(app)
                .get("/produto")
                .expect(200);
        })
        test("POST /", async () => {
            const response = await request(app)
                .post('/produto')
                .send({
                    name:"ps4",
                    descricao:"braboooo"
                })
                .expect(201);

            await request(app)
                .post('/produto')
                .send({})
                .expect(500);
        })
        test("GET /:id", async () => {
            const cat = await Produto.create({
                name:"ps5",
                descricao:"pssssszera"
            });

            const response = await request(app)
                .get(`/produto/${cat.id}`)
                .expect(200);

            const response2 = await request(app)
                .get("/produto/1000")
                .expect(500);
        })
        test("POST /:id", async () => {
            const cat = await Produto.create({
                name:"xbox",
                    descricao:"seris"
            });

            const response = await request(app)
                .post(`/produto/${cat.id}`)
                .send({
                    name:"Xbox Series",
                    descricao:"X"
                })
                .expect(200);
        })
        test("DELETE /:id", async () => {
            const cat = await Produto.create({
                    name:"Xbox Series",
                    descricao:"X"
            });
            const response = await request(app)
                .delete(`/produto/${cat.id}`)
                .expect(204);
        })

    });

});