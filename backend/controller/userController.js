const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 12;
const secretKey = "lab5iot";

module.exports = {
    login: async(req, res) => {
        const { username, password } = req.body;

        try {
            const existingUser = await User.findOne({ username });
            const passOk = bcrypt.compareSync(password, existingUser.password);
            const token = jwt.sign({ sub: existingUser._id }, secretKey);

            if (passOk) {
                jwt.sign(
                    { username, id: existingUser._id },
                    secretKey,
                    {expiresIn: '1h'},
                    (err, token) => {
                        if (err) throw err;
                        res.cookie("token", token).json({
                            token,
                            id: existingUser._id,
                            username,
                            password
                        });
                    }
                );
            } 
            
            else {
                res.status(400).json({
                    error: true,
                    message: "Wrong user or password"
                });
            }
        } 

        catch (error) {
            console.error(error);
            res.status(500).json({
                error: true,
                message: "Eternal server error"
            });
        }
    },

    register: async(req, res) => {
        const { username, password } = req.body;
        try {
          const existingUser = await User.findOne({ username });
    
            if (existingUser) {
                return res.status(400).json({
                    error: true,
                    message: "User already exist"
                });
            } 

            else {
                const salt = bcrypt.genSaltSync(saltRounds);
                const hashedPassword = bcrypt.hashSync(password, salt);
                const data = await User.create({
                    username,
                    password: hashedPassword,
                });
                res.status(201).json({
                    error: false,
                    message: "User registered successfully",
                    data
                });
            }
        } 
        
        catch (error) {
            console.error(error);
            res.status(500).json({
                error: true,
                message: "Eternal server error"
            });
        }
      }
}