const { sequelize } = require("../../src/app/models");

//resetando todas as tabelas do banco. chamado sempre ao inicializar um teste
module.exports = () => {
  return Promise.all(
    Object.keys(sequelize.models).map((key) => {
      return sequelize.models[key].destroy({ truncate: true, force: true });
    })
  );
};
