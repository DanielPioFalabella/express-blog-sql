const express = require("express");
const router = express.Router();
// import postControllers
const postControllers = require("./../controllers/postControllers")

// index
router.get("/", postControllers.index)

// show
router.get("/:id", postControllers.show)

// store
router.post("/", postControllers.store)

// update
router.put("/:id", postControllers.update)

// modify
router.patch("/:id", postControllers.modify)

// destroy
router.delete("/:id", postControllers.destroy)

module.exports = router;