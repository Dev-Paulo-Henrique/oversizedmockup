const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
var cons = require('consolidate');

app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'assets')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get("/api/images", (req, res) => {
  const textureFolder = path.join(__dirname, "assets", "textures");
  fs.readdir(textureFolder, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler a pasta de imagens" });
    }

    const imageFiles = files.filter((file) => file.endsWith(".png"));
    res.json(imageFiles);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
