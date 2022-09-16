const db = require("../db/db");
const { getComments } = require("../lib/getComments");

exports.handleGetAllComments = (req, res) => {
    const sql = "SELECT * FROM comments";
    db.query(sql, (err, result) => {
        if (err) throw err;
        const comments = getComments(result)
        res.status(200).json({ message: "success", comments });
    });
};
exports.handleGetSearchedComments = (req, res) => {
    const searchTerm = req.query.searchTerm;
    const sql = `SELECT * FROM comments
    WHERE body LIKE '%${searchTerm}%' LIMIT 20`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        const comments = getComments(result)
        res.status(200).json({ message: "search result success", comments });
    });
};
