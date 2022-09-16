const db = require("../db/db");
const fs = require("fs");
const { getComments } = require("../lib/getComments");
const handleFileUpload = (req, res) => {
    const fileName = req.file.filename;
    const data = require(`../uploads/${fileName}`);
    //creating comments table
    let sql =
        "CREATE TABLE IF NOT EXISTS comments(id int AUTO_INCREMENT, body VARCHAR(255) NOT NULL, postId int NOT NULL, userId int NOT NULL, username VARCHAR(255) NOT NULL, PRIMARY KEY(id))"; //create table statement
    //executing query
    db.query(sql, (err) => {
        if (err) throw err;
        //fetch all comments
        const sqlComments = "SELECT * FROM comments";
        db.query(sqlComments, (err, result) => {
            if (err) throw err;
            //comparing the values between database comments and uploaded comments, returning only differences
            const queryArr = [
                data.comments
                    .filter(
                        ({ body: id1 }) =>
                            !result.some(({ body: id2 }) => id2 === id1)
                    )
                    .map((field) => [
                        field.body,
                        field.postId,
                        field.user.id,
                        field.user.username,
                    ]),
            ];
            //only if we have unique comments we will add them into data base
            if (queryArr[0].length>0) {
                let sqlInsert =
                    "INSERT IGNORE INTO comments (body, postId, userId, username) VALUES ?";
                //executing the insert query
                db.query(sqlInsert, queryArr, function (err, result1) {
                    if (err) throw err;
                    fs.unlinkSync(`./uploads/${fileName}`); //deleting the file from the server after successfully inserted the files into the database
                    res.status(201).json({
                        message: "file data insert success",
                        result1,
                    });
                });
            }else{
                res.status(200).json({message: "All data are duplicate!"})
            }
        });
    });
};

module.exports = handleFileUpload;
