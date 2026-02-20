const postArray = require("./../data/postArray")
const connection = require("./../data/db-blog")

// index
function index(req, res) {
    // preparazione della query
    const sql = "SELECT * FROM posts"

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({error: "database query failed"})
            res.json(results)
    });
}

// show
function show(req, res) {
    // mi trasformo l'id in numero
    const id = parseInt(req.params.id)
    
    // preparazione della query
    const sql = "SELECT * FROM posts WHERE id = ?";

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({error: "database query failed"})
        if (results.length === 0) return res.status(404).json({error: "page not found"})
        res.json(results[0])
    });
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

    // preparazione della query
    const sql = "DELETE FROM posts WHERE id = ?";

    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({error: "database query failed"})
            res.sendStatus(204)
    });
}

module.exports = { index, store, show, modify, update, destroy }