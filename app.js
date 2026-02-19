const express = require("express");
const app = express();
const port = 3000;

// importo la rotta riferita a posts
const routerPosts = require("./routers/posts")
// importo il middleware per le pagine inesistenti
const notFound = require("./middlewares/notFound")
// importo il middleware per eventuali errori
const error = require("./middlewares/error")

// body parser
app.use(express.json());

app.use("/posts", routerPosts)

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send()
})

// middleware pagina inesistente
app.use(notFound)

// middleware errori
app.use(error)

app.listen(port, () => {
    console.log("il server è OK!")
})