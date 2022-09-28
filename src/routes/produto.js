const express = require("express");
const { all, one, insert, update, remove } = require("../controller/produto");
const auth = require("../middlewares/auth");

const router = express.Router();

router.use(auth);

router.get("/", all);
router.post("/", insert);
router.get("/:id", one);

router.post("/:id", update);
router.put("/:id", update);
router.patch("/:id", update);

router.delete("/:id", remove);

module.exports = router;