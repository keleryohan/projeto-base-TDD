require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "postgres",
  storage: "./__tests__/database.sqlite",
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps: true, //faz todas as tabelas terem os campos created_at e updated_at
    underscored: true, //faz o formato do nome das tabelas ser com underline ao invés de camel case
    underscoredAll: true, //o mesmo acima mas para os campos das tabelas também (n só o nome)
  },
};
