const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/routes");


const PORT = process.env.PORT || 5000;
const app = express();
app.set(PORT);

//Middlewares.
app.use(cors());
app.use(morgan("dev")); /* Muestra en la terminal los get */
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); /* Para leer json de los body */

app.use("/api/", routes);

//404 handler.
app.use(function (req, res, next) {
  res.status(404);
  res.send({ error: "Path Incorrecto. No se enconto la página" });
});

app.listen(PORT,()=>console.log('Server corriendo en puerto: ' + PORT))

module.exports = app;