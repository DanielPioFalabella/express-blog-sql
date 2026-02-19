const postArray = require("./../data/postArray")
const connection = require("./../data/db-blog")

// index
function index(req, res) {
    // preparazione della query
    const sql = "SELECT * FROM db-blog"

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({error: "database query failed"})
            res.json(results)
    });
}

// show
function show(req, res) {
    // mi trasformo l'id in numero
    const id = parseInt(req.params.id)
    // mi trovo l'id che mi interessa nel postArray e faccio in modo che coincida
    const post = postArray.find(post => post.id === id)

    // se l'id nn è presente faccio tornare errore in pagina
    if (!post) {
        res.status(404)

        return res.json({
            error: "Not found",
            message: "pagina non trovata"
        })
    }

    res.json(post)
}

// store
function store(req, res) {
    // mi creo un nuovo id
    const newId = Date.now()
    console.log(newId)

    // creo un nuovo post
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: "/imgs/posts/pane_fritto_dolce.jpeg",
        tags: req.body.tags,
    }

    postArray.push(newPost)

    console.log(postArray)
    res.status(201);
    res.json(newPost)
}

// modify
function modify(req, res) {
    const id = parseInt(req.params.id)
    const post = postArray.find(post => post.id === id)

    // gli dico cosa deve darmi se nn trova la pagina
    if (!post) {
        res.status(404)

        return res.json({
            error: "Not found",
            message: "nessun contenuto"
        })
    }

    req.body.title ? post.title = req.body.title : post.title = post.title;

    res.json(post)
}

// update
function update(req, res) {
    const id = parseInt(req.params.id)
    const post = postArray.find(post => post.id === id)

    // gli dico cosa deve darmi se nn trova la pagina
    if (!post) {
        res.status(404)

        return res.json({
            error: "Not found",
            message: "nessun contenuto"
        })
    }

    post.title = req.body.title
    post.content = req.body.content
    post.image = req.body.image
    post.tags = req.body.tags

    res.json(post)
}

// destroy
function destroy(req, res) {
    const id = parseInt(req.params.id)
    const post = postArray.find(post => post.id === id)

    // gli dico cosa deve darmi se nn trova la pagina
    if (!post) {
        res.status(404)

        return res.json({
            error: "Not found",
            message: "nessun contenuto"
        })
    }

    postArray.splice(postArray.indexOf(post), 1)
    console.log(postArray);

    res.sendStatus(204)
}

module.exports = { index, store, show, modify, update, destroy }