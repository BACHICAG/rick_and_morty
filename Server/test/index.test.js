const app = require('../src/App.js');
const session = require('supertest');
const agent = session(app);

describe("Test de RUTAS", ()=>{

    describe("GET /character/:id", ()=>{

        it("Responde con status: 200", async ()=>{
            await agent.get('/character/1').expect(200);
        });

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async ()=>{
            const response = await agent.get('/character/1');
            const props = ["id", "name", "species", "gender", "status", "origin", "image"];
            props.forEach((prop)=>{
                expect(response.body).toHaveProperty(prop);
            });
        });

        it('Si hay un error responde con status: 500', async ()=>{
            const response = await agent.get('/character/10000').expect(500);
            expect(response.statusCode).toBeGreaterThan(400);
        });
    });

    describe("GET /user/login", ()=>{

        it("GET whit correct data, should return access true", async ()=>{
            const response = await agent.get("/user/login?email=bryan@henry.com&password=Bryan40a");
            const access = {access: true}
            expect(response.body).toEqual(access);
        });

        it("GET whit incorrect data, should return access false", async ()=>{
            const response = await agent.get("/user/login?email=brayan@henrry.com&password=Bryan40b");
            expect(response.body).toEqual(false);
        });
        
    });

    describe("Favorites", ()=>{

        const character1 = {id: 1, name: "Mario"};
        const character2 = {id:2, name: "Goku"};
        
        describe("POST /favorites", ()=>{
    
            it("POST should add the character to the favs", async ()=>{
                const response = (await agent.post("/favorites")).send(character1);
                expect(response.body.length).toBe(1);
                expect(response.body).toContainEqual(character1);  
            });
    
            it("POST should add the second character to the favs", async ()=>{
                const response = (await agent.post("/favorites")).send(character2);
                expect(response.body.length).toBe(2);
                expect(response.body).toContainEqual(character1);
                expect(response.body).toContainEqual(character2);
            });
        });
    
        describe("DELETE /favorites/:id", ()=>{
            it("DELETE should return the previous character when sending wrong data", async ()=>{
                const response = (await agent.delete("/favorites/69"))
                expect(response.body.length).toBe(2);
                expect(response.body).toContainEqual(character1);
                expect(response.body).toContainEqual(character2);
            });

            it("DELETE should delete the character when sending correct data", async ()=>{
                const response = (await agent.delete("/favorites/2"));
                expect(response.body.length).toBe(1);
                expect(response.body).toContainEqual(character1);
                expect(response.body).not.toContainEqual(character2);
            });
    
        });
    });
});