const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  //criando novo model sequelize
  const User = sequelize.define(
    "User", //nome do model
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL, //campo presente apenas no model. n na base de dados
      password_hash: DataTypes.STRING,
    },
    {
      hooks: {
        //sempre antes de salvar um novo usuário
        beforeSave: async (user) => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
          }
        },
      },
    }
  );

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash);
  };

  //função gerando o token para identificar o usuário
  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  };

  return User;
};
