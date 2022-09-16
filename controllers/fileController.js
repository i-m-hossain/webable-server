const db = require("../db/db");
var mysql = require("mysql");
const fs = require("fs");
const { getComments } = require("../lib/getComments");
const handleFileUpload = (req, res) => {
    const fileName = req.file.filename;
    const data = require(`../uploads/${fileName}`);
    //creating comments table
    let sql =
        "CREATE TABLE IF NOT EXISTS comments(id int, body VARCHAR(255) NOT NULL, postId int NOT NULL, userId int NOT NULL, username VARCHAR(255) NOT NULL, PRIMARY KEY(id))"; //create table statement
    //executing query
    db.query(sql, (err) => {
        if (err) throw err;
        //fetch all comments
        const sqlComments = "SELECT * FROM comments";
        db.query(sqlComments, (err, result) => {
            if (err) throw err;
            
            //comparing the values between database comments and uploaded comments, returning only differences
            const queryArrForInsert = [
                data.comments
                    .filter(
                        ({ id: id1 }) =>
                            !result.some(({ id: id2 }) => id1 === id2)
                    )
                    .map((field) => [
                        field.id,
                        field.body,
                        field.postId,
                        field.user.id,
                        field.user.username,
                    ]),
            ];


            //if new data are added in the response.json
            if (queryArrForInsert[0].length > 0) {
                let sqlInsert =
                    "INSERT IGNORE INTO comments (id, body, postId, userId, username) VALUES ?";
                //executing the insert query
                db.query(sqlInsert, queryArrForInsert, function (err, result1) {
                    if (err) throw err;
                    fs.unlinkSync(`./uploads/${fileName}`); //deleting the file from the server after successfully inserted the files into the database
                    res.status(201).json({
                        message: "file data insert success",
                        result1,
                    });
                });
            } else {
                fs.unlinkSync(`./uploads/${fileName}`); //deleting the file from the serer
                res.status(200).json({ message: "All data are duplicate!" });
            }
        });
    });
};

module.exports = handleFileUpload;
