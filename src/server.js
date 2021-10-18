const app = require("./app");

//se a variável ambiente PORT não existir. suba no localhost 3000
app.listen(process.env.PORT || 3000);
