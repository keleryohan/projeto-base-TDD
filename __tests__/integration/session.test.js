//biblioteca para simular resultado de rotas
const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

//testes envolvendo autenticação
describe("Authentication", () => {
  //antes de cada teste, resetando todas as tabelas do banco
  beforeEach(async () => {
    await truncate();
  });

  //descrição do que o teste deveria fazer (it should...)
  it("should authenticate with valid credentials", async () => {
    //criando um usuário usando o factory girl. sobrepondo parametro de senha para o teste
    const user = await factory.create("User", {
      password: "123123",
    });

    //simulando resposta da rota usando a supertest
    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123123",
    });

    //espera que tal valor seja igual, maior que, chamado x vezes(função)...
    expect(response.status).toBe(200);
  });

  it("should not authenticate with invalid credentials", async () => {
    const user = await factory.create("User", {
      password: "123123",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123456",
    });

    expect(response.status).toBe(401);
  });

  it("should return jwt token when authenticated", async () => {
    const user = await factory.create("User", {
      password: "123123",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123123",
    });

    expect(response.body).toHaveProperty("token");
  });

  it("should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User", {
      password: "123123",
    });

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`); //obs: é necessário colocar esse Bearer antes do token JWT. n só em testes

    expect(response.status).toBe(200);
  });

  it("should not be able to access private routes without jwt token", async () => {
    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(401);
  });

  it("should not be able to access private routes with invalid jwt token", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer 123123`);

    expect(response.status).toBe(401);
  });
});
