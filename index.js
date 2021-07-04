const express = require("express");
const app = express();
const router = require("./router");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {
	console.log("Servidor na porta ", port);
});
