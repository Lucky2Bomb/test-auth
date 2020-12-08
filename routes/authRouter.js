const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/registration", [
    check("username", "username field cannot be empty").notEmpty(),
    check("password", "password field cannot be <4 and >12 symbols").isLength({ min: 4, max: 12 }),
], controller.registration);
router.post("/login", controller.login);
router.get("/users", roleMiddleware(["USER", "ADMIN"]), controller.getUsers);

module.exports = router;