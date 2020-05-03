// Dependencies
var mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require('inquirer-confirm');

// MySQL DB Connection Information
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Taraji1919",
  database: "Employee_Tracker"
}); 

/*var showRole = showroles;
var showDepartments = showdepartments;
var showEmployees = showemployees;*/



// Initiate MySQL Connection.
connection.connect(function (err) {
  
  if (err) throw err;
    
  
  console.log("connected as id " + connection.threadId);

 /* connection.query("SELECT * from role", function (error, res) {
    showroles = res.map(role => ({ name: role.title, value: role.id }))
  })
  connection.query("SELECT * from department", function (error, res) {
    showdepartments = res.map(dep => ({ name: dep.name, value: dep.id }))
  })
  connection.query("SELECT * from employee", function (error, res) {
    showemployees = res.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
  })*/

  showmenu();
});

// Show inquirer menu
function showmenu() {
  inquirer
    .prompt(
      {
        type: "list",
        message: "Welcome to Employee Tracker. What would you like to do?",
        name: "choices",
        choices: ["View all employees",
                  "View all departments",
                  "View all roles",
                  "Add new employee",
                  "Add department",
                  "Add role",
                  "Update employee roles",
                  "Delete role id",
                  "Quit"]
      }).then(function (res) {
     /*choicesMenu(res.choices)*/
     switch (res.choices)
     {
       case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
         case "View all employees":
            viewAllEmployees();
            break;
         case "Add new employee":
            addEmployee();
            break;
         case "Add department":
            addDepartment();
            break;
          case "Add role":
                addRole();
            break;
          case "Update employee roles":
              updateEmployeeRoles();
            break;
          case "Delete role id":
             deleteRoleId();
            break;

        case "Quit":
        connection.end();  
     }
    });
}

function viewAllDepartments() {
  console.log("view all departments")
  connection.query("SELECT * from department", function (error, res) {
    console.table(res);
    showmenu();
  })
}
function viewAllRoles() {
  connection.query("SELECT * from role", function (error, res) {
    console.table(res);
    showmenu();
  })
}
function viewAllEmployees() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", function (error, res) {
    console.table(res);
    showmenu();
  })
}
function addDepartment(){
  inquirer.prompt({
    name: "dept",
    message: "what department did you want to add?",
    type: "input"
  }).then(function(data){

  connection.query(`INSERT INTO department (name) VALUES ("${data.dept}")`, function(err, res){
   if (err) throw err;
      console.log(res);
      showmenu();
  
  });
});
}
function addRole (){
  inquirer.prompt([{
    name: "title",
    message: "what role title you need to add?",
    type: "input"
  },
  {
    name: "salary",
    message: "what is the  salary you would like? ",
    type: "input"

  },
  {
    name: "department_id",
    message: "what is the department_id ? ",
    type: "input"

  }]
  
  
  ).then(function(data){

  connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${data.title}", ${data.salary}, ${data.department_id})`, function(err, res){
   if (err) throw err;
      console.log(res);
      showmenu();
  
  });
});
}
function addEmployee (){
  inquirer.prompt([{
    type: "input",
    message: "What is the first name?",
    name: "first_name",
  },
  {
    type: "input",
    message: "What is the last name?",
    name: "last_name",
  },
  {
    type: "input",
    message: "What is the employee's role_id?",
    name: "role_id",
    
  }
 
])
  
  
  .then(function(data){

  connection.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ("${data.first_name}", "${data.last_name}", ${data.role_id})`, function(err, res){
   if (err) throw err;
      console.log(res);
      showmenu();
  
  });
});
}
function updateEmployeeRoles(){
  inquirer.prompt([{
    type: "input",
    message: "Which employee you want to update ?",
    name: "employee",
  }
 
])
.then(function(data){

  connection.query("UPDATE Employee_Tracker.employee SET first_name = '?' where id = 1", function(err, res){
   if (err) throw err;
      console.log(res);
      showmenu();
  
  });
});
}
function deleteRoleId(){
  inquirer.prompt([{
    type: "input",
    message: "Which title you want to delete ?",
    name: "role",
  }
 
])
.then(function(data){

  connection.query("delete from Employee_Tracker.role where title = '?' ", function(err, res){
   if (err) throw err;
      console.log(res);
      showmenu();
  
  });
});
}

function showMenu() {
  confirm("Would you like to continue?")
  .then(function confirmed() {
    showmenu();
  }, function Quit() {
    end();
  });
}

function end() {
  console.log("Thank you for using Employee Tracker!");
  connection.end();
  process.exit();
} 