const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config/config");

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, { expiresIn: "1h" });
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "validation error" });
            }
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });

            if (candidate) {
                return res.status(400).json({ message: "user with this username already exists" });
            }
            const hashPassword = bcrypt.hashSync(password, 6);
            const userRole = await Role.findOne({ value: "USER" });
            const user = new User({ username, password: hashPassword, roles: [userRole.value] });
            await user.save();
            return res.json({ message: "user created successfully" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "registration error" });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: `User ${user} not found` });
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Wrong password entered" });
            }

            const token = generateAccessToken(user._id, user.roles);
            return res.json({ token });

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "login error" });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "get users error" });
        }
    }
}

module.exports = new authController();