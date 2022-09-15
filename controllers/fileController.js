const db = require("../db/db");
const fs = require("fs");
const handleFileUpload = (req, res) => {
    const fileName = req.file.filename;
    const data = require(`../uploads/${fileName}`);
    //creating comments table
    let sql =
        "CREATE TABLE IF NOT EXISTS comments(id int AUTO_INCREMENT, body VARCHAR(255) NOT NULL, postId int NOT NULL, userId int NOT NULL, username VARCHAR(255) NOT NULL, PRIMARY KEY(id))"; //create table statement
    //executing query
    db.query(sql, (err, result) => {
        if (err) throw err;
        //after successfully created the table let's populate it with values from file data
        let sqlInsert =
            "INSERT IGNORE INTO comments (body, postId, userId, username) VALUES ?";
        //returning an array of comments (insertMany)
        const queryArr = [
            data.comments.map((field) => [
                field.body,
                field.postId,
                field.user.id,
                field.user.username,
            ]),
        ];

        //executing the insert query
        db.query(sqlInsert, queryArr, function (err, result) {
            if (err) throw err;
            fs.unlinkSync(`./uploads/${fileName}`);//deleting the file from the server after successfully inserted the files into the database
            res.status(201).json({ message: "file data insert success", result });
        });
        
    });
};

module.exports = handleFileUpload;
