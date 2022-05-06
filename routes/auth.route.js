const express = require("express");
const AuthController = require("../controllers/auth.controller");
const router = express.Router();



// router.get("/", async (req, res, next) => {
//   res.send("root route")
// })


router.post("/register", AuthController.register)

  router.post("/login", AuthController.login)

router.delete("/logout", AuthController.delete)

router.post("/refresh-token", AuthController.refreshToken)

module.exports = router;