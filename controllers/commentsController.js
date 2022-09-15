const db = require("../db/db");

exports.handleGetAllComments = (req, res) => {
    const sql = "SELECT * FROM comments";
    db.query(sql, (err, result) => {
        if (err) throw err;
        const comments = result.map((row) => ({
            id: row.id,
            body: row.body,
            postId: row.postId,
            user: { id: row.userId, username: row.username },
        }));
        res.status(200).json({ message: "success", comments: comments });
    });
};
