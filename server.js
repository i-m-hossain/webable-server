const express = require("express");
require('dotenv').config()
const bodyParser = require("body-parser");
var cors = require('cors')
const dbConnect = require("./db/dbConnect");
const fileRouter = require("./routes/fileRoute");
const commentsRouter = require("./routes/commentsRouter");
const app = express();
const port = 5000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connecting to database
dbConnect()

//test route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//routes
app.use('/file', fileRouter)
app.use('/comments', commentsRouter)

//starting server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
