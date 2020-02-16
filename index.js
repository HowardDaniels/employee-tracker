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

});

function readDepartments()
{
    connection.query("SELECT name from department", function(err, res){
            if(err)
            throw err;
         //  console.log(departments);
         const departments = resolve(JSON.parse(JSON.stringify(res.name)));
          //  connection.end();
   
        //  console.log(JSON.parse(JSON.stringify(res)));
        // console.log(departments);
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
                connection.query("INSERT INTO department (name) VALUES ('" + insertDepartment.departmentToAdd + "')", function(err, res){
                    if(err)
                    throw err;
                    console.log(res);
                    connection.end();
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
                    connection.query("INSERT INTO role (title, salary, department_id) VALUES (" + (insertRole.roleToAdd).toString(), insertRole.roleSalary, + 
                    "department.id WHERE department.name='" + insertRole.roleDepartment + "')", function(err, res){
                        if(err)
                        throw err;
                        console.log(res);
                        connection.end();
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
                    (insertEmployee.employeeFirstName).toString(), (insertEmployee.employeeLastName).toString(), (insertEmployee.employeeRole).toString(), 
                    insertEmployee.employeeManagerID + ")", function(err, res){
                        if(err)
                        throw err;
                        console.log(res);
                       connection.end();
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

            var departments = [];
            // departments.push(employee_tracker_db.de)
            for(var i = 0;i<data.length;i++){
            departments.push(data[i].name)
            };
            
            
            inquirer
            .prompt([{
                type: "list",
                message: "Which of the following would you like to update?",
                name: "departmentToUpdate",
                choices: departments
            },
            {
                type: "input",
                message: "What would you like to change that department name to?",
                name: "newDepartmentName"
            }])
        
            .then(updatedDept => {
                connection.query("UPDATE departments SET name = " + (updatedDept.newDepartmentName).toString() + " WHERE name= " + (updatedDept.departmentToUpdate).toString(), function(err, res){
                    if(err)
                    throw err;
                    console.log(res);
                    connection.end();
                });
            }
                
            )
        }
        else if (updateChoice.infoToUpdate === "roles"){

            var roles = [];
            readRoles();
            
            inquirer
            .prompt([{
                type: "list",
                message: "Which of the following roles would you like to update?",
                name: "rolestoUpdate",
                choices: roles
            }])
            .then(

            )
            
        }
        else if (updateChoice.infoToUpdate === "employees"){

            var employees = [];
            readEmployees();

            inquirer
            .prompt([{
                type: "list",
                message: "Which of the following roles would you like to update?",
                name: "employeestoUpdate",
                choices: employees
            }])
            .then(
                
            )
            
        }
    })
}

//    connection.end();
});
}

// var viewByLastName = function(){
//     connection.query("select last_name from employee",function(err,data){
//         if(err) throw err;
//         var lastNames=[];
//         for(var i = 0;i<data.length;i++){
//             lastNames.push(data[i].last_name);
//         }
//         inquirer.prompt([{
//             type:"list",
//             message:"which was the last name of the creature?",
//             name:"lastName",
//             choices:lastNames
//         }]).then(function(data){
//             connection.query("SELECT * from employee where last_name =?", [data.lastName],function(err,data){
//                 if(err) throw err;
//                 console.log("here they are my lord");
//                 console.table(data);
//             })
//         })
//     })
// }