const express = require('express');
const conn = require('./connection/connection');
const auth = require('./routes/auth');
const list = require('./routes/list');
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
    

app.listen(1000, (req, res) => {
    console.log("Server started");
})


app.use('/api/v1', auth);
app.use('/api/v2', list);

app.get('/', (req, res) => {
    res.send("Hello");
}) 

