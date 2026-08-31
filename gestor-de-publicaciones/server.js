import express from "express";

const app = express();

// Publica la carpeta "public" directamente
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
