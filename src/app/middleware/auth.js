const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token not provided" });
  }

  //como authentication tem 'Bearer' antes do token. está sendo feito um split entre os dois e pegando só o segundo elemento(o token)
  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
};
