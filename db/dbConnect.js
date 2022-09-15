const db = require("./db");
async function dbConnect() {
    db.connect(function (err) {
        if (err) {
            console.error("error connecting: " + err.stack);
        }
        console.log("connected to mysql");
        
        //creating database if not exist
        const sql = "CREATE DATABASE IF NOT EXISTS webable";
        db.query(sql,(err, result)=>{
            if(err)throw new err
            console.log("database created");
        })
    });
}
module.exports = dbConnect;
