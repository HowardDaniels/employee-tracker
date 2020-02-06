var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "testtest",
    database: "employeetracker"
});
connection.connect(function(err){
    if(err)
    throw err;
    console.log("connected at :" + connection.threadId);
   // readColleges();
});
/*function readColleges()
{
    connection.query("SELECT name from albany", function(err, res){
            if(err)
            throw err;
            console.log(res);
            connection.end();
    });
} */