const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SIGN UP
router.post("/register", async (req, res) => {
    try {
        const {email, username, password} = req.body;
        const hashPassword = bcrypt.hashSync(password);
        const user = new User({
            email, username, password: hashPassword
        });
        await user.save().then(() => {
            res.status(200).json({message: "Sign Up successful"});
        })
    } catch(err) {
        res.status(200).json({message: "User is already registered."});
    }
});


// SIGN IN
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ message: "Please Sign Up first." });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({ message: "Password is incorrect." });
        }

        const { password: _, ...others } = user._doc;
        return res.status(200).json(others);
    } catch (err) {
        return res.status(200).json({ message: "An error occurred during login." });
    }
});



module.exports = router;