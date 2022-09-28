const request = require("supertest");
const { database, TipoProduto } = require("../models");
const app = require("./../app");
const auth = require("../middlewares/auth");


describe("Routes", () => {
    beforeAll(async () => {
        await database.sync();
    });

    describe("tipoproduto", () => {
        test("GET /", async () => {
            const response = await request(app)
                .get("/tipoproduto")
                .expect(200);
        })
        test("POST /", async () => {
            const response = await request(app)
                .post('/tipoproduto')
                .send({
                    nome:"PC",
                    
                })
                .expect(201);

            await request(app)
                .post('/tipoproduto')
                .send({})
                .expect(500);
        })
        test("GET /:id", async () => {
            const cat = await TipoProduto.create({
                    nome:"Console",
                    
            });

            const response = await request(app)
                .get(`/tipoproduto/${cat.id}`)
                .expect(200);

            const response2 = await request(app)
                .get("/tipoproduto/1000")
                .expect(500);
        })
        test("POST /:id", async () => {
            const cat = await TipoProduto.create({
                nome:"Celular",
               
            });

            const response = await request(app)
                .post(`/tipoproduto/${cat.id}`)
                .send({
                nome:"Tv"
                
                })
                .expect(200);
        })
        test("DELETE /:id", async () => {
            const cat = await TipoProduto.create({
                nome:"Tv"
            });
            const response = await request(app)
                .delete(`/tipoproduto/${cat.id}`)
                .expect(204);
        })

    });

});
