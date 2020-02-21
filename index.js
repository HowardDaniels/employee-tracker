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

function viewDepartments()
{
    console.log("it's working")
    connection.query("select * from department", function(err,data){
                if(err) throw err;
                var departments=[];
                for(var i = 0;i<data.length;i++){
                    departments.push(data[i].name);
                }
                console.log(departments);
                console.table(data);
                })
}

function viewRoles()
{
    connection.query("SELECT title from role", function(err, res){
            if(err)
            throw err;
            console.log(res);
          //  connection.end();
    });
}

function viewEmployees()
{
    connection.query("SELECT * from employee", function(err, data){
        if(err) throw err;
        var employees=[];
        for(var i = 0;i<data.length;i++){
            employees.push(data[i].first_name);
        }
        // console.log(employees);
        console.table(data);
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
                // viewDepartments();
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
                    // var deptID = 0;
                    // connection.query("SELECT * from department", function(err, res){
                                
                    //     for(var i = 0;i<res.length;i++){
                    //          if (res[i].name == insertRole.roleDepartment) {
                    //             deptID = res[i].id;
                    //              console.log(deptID);
                    //          }
                    //          else {
                    //              console.log("--");
                    //          }
                    //         }

                    //         console.log(deptID);
                       
                            //         }
          
                    connection.query("INSERT INTO role (title, salary, department_id) VALUES ( '" + insertRole.roleToAdd + "'," + insertRole.roleSalary + ", (SELECT id FROM employee_tracker_db.department WHERE name='" + insertRole.roleDepartment + "'))", function(err, res){
                        if(err)
                        throw err;
                        console.log(res);
                        // console.log(deptID);
                       connection.end();
                    }); 
                });      
                // });
                    
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
                    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( '" + insertEmployee.employeeFirstName + "', '" + insertEmployee.employeeLastName + "', (SELECT id FROM employee_tracker_db.role WHERE title='" + insertEmployee.employeeRole + "')," + insertEmployee.employeeManagerID + ")", function(err, res){
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
        type: "list",
        message: "What company information would you like to view?",
        name: "infoToView",
        choices: ["departments", "roles", "employees"]
    }])
    .then(viewChoice => {
        if (viewChoice.infoToView === "departments"){
            viewDepartments();
        }
        else if (viewChoice.infoToView === "roles"){
            viewRoles();
        }
        else if (viewChoice.infoToView === "employees"){
            viewEmployees();
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

            connection.query("select * from department", function(err,data){
                     if(err) throw err;
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
                connection.query("UPDATE department SET name = '" + updatedDept.newDepartmentName + "' WHERE name = '" + updatedDept.departmentToUpdate + "'", function(err, res){
                    if(err)
                    throw err;
                    console.log(res);
                    connection.end();
                });
            })
        });
                
            
        }

        else if (updateChoice.infoToUpdate === "roles"){

            var roles = [];
            connection.query("select title from role", function(err,data){
                if(err) throw err;
       for(var i = 0;i<data.length;i++){
       roles.push(data[i].title)
       };
            
            inquirer
            .prompt([{
                type: "list",
                message: "Which of the following roles would you like to update?",
                name: "roletoUpdate",
                choices: roles
            },
            {
                type: "input",
                message: "What would you like the title of this role to be?",
                name: "updatedRoleTitle"
            },
            {
                type: "input",
                message: "What would you like the salary of this role to be?",
                name: "updatedRoleSalary"
            },
            {
                type: "input",
                message: "What would you like the department of this role to be?",
                name: "updatedRoleDepartment"
            }])
            .then(updatedRole => {
                connection.query("UPDATE role SET title = '" + updatedRole.updatedRoleTitle + "', salary =" + updatedRole.updatedRoleSalary + ", department_id = (SELECT id from employee_tracker_db.department WHERE name = '" + updatedRole.updatedRoleDepartment + "') WHERE title = '" + updatedRole.roletoUpdate + "'", function(err, res){
                    if(err)
                    throw err;
                    console.log(res);
                    connection.end();
                });
            })

            
            
                  });
                }

        else if (updateChoice.infoToUpdate === "employees"){

            var employees = [];
            connection.query("select * from employee", function(err,data){
                if(err) throw err;
                for(var i = 0;i<data.length;i++){
                employees.push(data[i].first_name)
                };

            inquirer
            .prompt([{
                type: "list",
                message: "Which of the following roles would you like to update?",
                name: "employeetoUpdate",
                choices: employees
            },
            {
                type: "input",
                message: "What would you like to change the first name to?",
                name: "updatedEmployeeFirstName"
            },
            {
                type: "input",
                message: "What would you like to change the last name to?",
                name: "updatedEmployeeLastName"
            },
            {
                type: "input",
                message: "What would you like to change the role to?",
                name: "updatedEmployeeRole"
            },
            {
                type: "input",
                message: "What would you like to change the manager ID to?",
                name: "updatedEmployeeManagerID"
            }])
            .then(updatedEmployee => {
                connection.query("UPDATE employee SET first_name = '" + updatedEmployee.updatedEmployeeFirstName + "', last_name = '" + updatedEmployee.updatedEmployeeLastName + "', role_id = (SELECT id from employee_tracker_db.role WHERE title = '" + updatedEmployee.updatedEmployeeRole + "'), manager_id = " + updatedEmployee.updatedEmployeeManagerID + " WHERE first_name = '" + updatedEmployee.employeetoUpdate + "'", function(err, res){
                    if(err)
                    throw err;
                    console.log(res);
                    connection.end();

                });


            }
                
            )
            
        });
        }
})

//    connection.end();
};

});
}

// var viewByLastName = function(){
//     connection.query("select last_name from employee", function(err,data){
//         if(err) throw err;
//         var lastNames=[];
//         for(var i = 0;i<data.length;i++){
//             lastNames.push(data[i].last_name);
//         }

//         inquirer
//         .prompt([{
//             type:"list",
//             message:"which was the last name of the creature?",
//             name: "lastName",
//             choices: lastNames
//         }])
//         .then(function(data){
//             connection.query("SELECT * from employee where last_name =?", [data.lastName], function(err,data){
//                 if(err) throw err;
//                 console.log("here they are my lord");
//                 console.table(data);
//             })
            
//         })
//     })
// }