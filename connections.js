const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit:10,
    host:"localhost",
    user:"root",
    password:"",
    database:"customers"

});

module.exports = pool;

    // con.connect(function(error){
    //     if(error) throw error;

    //     con.query("select * from users", function(error,result){
    //         if(error) throw error;
    //         console.log(result[0].Name);

    //     })
    // });