const inquirer = require("inquirer");
const mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "testtest",
    database: "employee_tracker_db"
});
connection.connect(function(err){
    if(err)
    throw err;
    console.log("connected at :" + connection.threadId);
    actionPrompt();
    /*readDepartments();
   readRoles();
   readEmployees(); */

});

function readDepartments()
{
    connection.query("SELECT name from department", function(err, res){
            if(err)
            throw err;
            console.log(res);
            connection.end();
    });
}

function readRoles()
{
    connection.query("SELECT title from role", function(err, res){
            if(err)
            throw err;
            console.log(res);
            connection.end();
    });
}

function readEmployees()
{
    connection.query("SELECT name from employee", function(err, res){
            if(err)
            throw err;
            console.log(res);
            connection.end();
    });
}

function actionPrompt()
{
    inquirer
.prompt([{
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: ["add company information", "view company information", "update company information"]
  }])
.then(actionChoice => {
    console.log(JSON.stringify(actionChoice));
    
if (actionChoice.action === "add company information"){
    inquirer
    .prompt([{
        type: "list",
        message: "What would you like to add?",
        name: "addition",
        choices: ["department", "role", "employee"]
    }])
    .then(additionChoice => {
        console.log(JSON.stringify(additionChoice));

        if (additionChoice.addition === "department"){
            
        }
        else if (additionChoice.addition === "role"){

        }
        else if (additionChoice.addition === "employee"){

        }
    })
}

else if (actionChoice.action === "view company information"){
    inquirer
    .prompt([{
        type: "list",
        message: "Would you like to view all of the company information or specific company information?",
        name: "data",
        choices: ["all company information", "specific company information"]
    }])
    .then()
}

else if (actionChoice.action === "update company information"){
    inquirer
    .prompt([{
        type: "list",
        message: "What would you like to update?",
        name: "data",
        choices: ["department", "role", "employee"]
    }])
    .then()
}

    connection.end();
})
}