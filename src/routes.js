const routes = require("express").Router();

const authMiddleware = require("./app/middleware/auth");

const SessionController = require("./app/controllers/SessionController");

routes.post("/sessions", SessionController.store);

//middleware para checar se o usuário está autenticado
//obs: só será aplicado nas rotas depois desta declaração v
routes.use(authMiddleware);

//rota para testar se o usuário está autenticado
routes.get("/dashboard", (req, res) => {
  return res.status(200).send();
});

module.exports = routes;
