//setup the router to fetch the data
const router = require("express").Router();
const {register,login} = require("../controllers/AuthControllers")
router.post("/")
router.post("/register",register)
router.post("/login",login)

module.exports = router;