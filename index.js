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
          //  connection.end();
    });
}

function readRoles()
{
    connection.query("SELECT title from role", function(err, res){
            if(err)
            throw err;
            console.log(res);
          //  connection.end();
    });
}

function readEmployees()
{
    connection.query("SELECT name from employee", function(err, res){
            if(err)
            throw err;
            console.log(res);
           // connection.end();
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
        message: "What company information would you like to add?",
        name: "infoToAdd",
        choices: ["department", "role", "employee"]
    }])
    .then(additionChoice => {
        console.log(JSON.stringify(additionChoice));

        if (additionChoice.infoToAdd === "department"){
            inquirer
            .prompt([{
                type: "input",
                message: "Insert a department to add:",
                name: "departmentToAdd"
            }])
            .then(insertDepartment => {
                readDepartments();
                connection.query("INSERT INTO department (name) VALUES (" + insertDepartment.departmentToAdd + ")", function(err, res){
                    if(err)
                    throw err;
                    console.log(res);
                  //  connection.end();
            });
                
            }
                
            )
        }

        else if (additionChoice.infoToAdd === "role"){
                inquirer
                .prompt([
                    {
                    type: "input",
                    message: "Insert a role to add:",
                    name: "roleToAdd"
                    },
                    {
                    type: "input",
                    message: "Insert a salary for the role (leave out the currency symbol):",
                    name: "roleSalary"
                    },
                    {
                    type: "input",
                    message: "Insert a department for the role:",
                    name: "roleDepartment"
                    }
            ])
                .then(insertRole => {
                    connection.query("INSERT INTO role (title, salary, department_id) VALUES (" + insertRole.roleToAdd, insertRole.roleSalary, + 
                    "department.id WHERE department.name=" + insertRole.roleDepartment + ")", function(err, res){
                        if(err)
                        throw err;
                        console.log(res);
                       // connection.end();
                    });                    
                });
                    
                }
                    
        else if (additionChoice.infoToAdd === "employee"){

            inquirer
                .prompt([
                    {
                    type: "input",
                    message: "Insert an employee's first name to add:",
                    name: "employeeFirstName"
                    },
                    { 
                    type: "input",
                    message: "Insert an employee's last name to add:",
                    name: "employeeLastName"   
                    },
                    {
                    type: "input",
                    message: "Insert an employee's role to add:",
                    name: "employeeRole"    
                    },
                    {
                    type: "input",
                    message: "Insert an employee's manager ID to add:",
                    name: "employeeManagerID"
                    }
            ])
                .then(insertEmployee => {
                    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (" + 
                    insertEmployee.employeeFirstName, insertEmployee.employeeLastName, insertEmployee.employeeRole, 
                    insertEmployee.employeeManagerID + ")", function(err, res){
                        if(err)
                        throw err;
                        console.log(res);
                      //  connection.end();
                });

                  
                       
                    });

                }

            });
}

else if (actionChoice.action === "view company information"){

    inquirer
    .prompt([{
        type: "checkbox",
        message: "What company information would you like to view?",
        name: "infoToView",
        choices: ["departments", "roles", "employees"]
    }])
    .then(viewChoice => {
        if (viewChoice.infoToView === "departments"){
            readDepartments();
        }
        else if (viewChoice.infoToView === "roles"){
            readRoles();
        }
        else if (viewChoice.infoToView === "employees"){
            readEmployees();
        }
    });
}

else if (actionChoice.action === "update company information"){
    inquirer
    .prompt([{
        type: "list",
        message: "What company information would you like to update?",
        name: "infoToUpdate",
        choices: ["departments", "roles", "employees"]
    }])
    .then(updateChoice => {
        if (updateChoice.infoToUpdate === "departments"){
            
        }
        else if (updateChoice.infoToUpdate === "roles"){
            
        }
        else if (updateChoice.infoToUpdate === "employees"){
            
        }
    })
}

  //  connection.end();
});
}