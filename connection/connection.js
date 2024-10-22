const mongoose = require('mongoose');

// const conn = async (req, res) => {
//     await mongoose.connect("mongodb+srv://hritiksingh7:test1234@todo.uidkjrc.mongodb.net/")
//     .then(result => {console.log("MongoDB connected")})
//     .catch(err => {console.log(err.message)})
// }


const conn = async (req, res) => {
    try {
        await mongoose.connect("mongodb+srv://hritiksingh7:test1234@todo.uidkjrc.mongodb.net/")
        .then(result => {console.log("MongoDB connected")});
    } catch(err) {
        res.status(400).json({
            message: "Not connected",
        });
    }
}

conn();