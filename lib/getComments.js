exports.getComments=(result)=>{
    const comments = result.map((row) => ({
        id: row.id,
        body: row.body,
        postId: row.postId,
        user: { id: row.userId, username: row.username },
    }));
    return comments
}
