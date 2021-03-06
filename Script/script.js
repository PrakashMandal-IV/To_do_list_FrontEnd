if(document.cookie == "")
{
    document.getElementById('logpanel').style.display = "block"
    document.getElementById('regpanel').style.display = "none"
    document.getElementById('mainpage').style.display ="none"
} 
else{
    document.getElementById('logpanel').style.display = "none"
    document.getElementById('regpanel').style.display = "none"
    document.getElementById('mainpage').style.display ="block"
}

host = 'localhost:5003'  // CHANGE THE DOMANE OF THE BACKEND IF NEED
//end points 
const Loginurl = 'http://'+host+'/Controller/login'
const RegUrl = 'http://'+host+'/Controller/register-user'
const tasklisturl = 'http://'+host+'/Controller/get-today-task'
const addtask = 'http://'+host+'/Controller/add-task'
const deleteTaskurl = 'http://'+host+'/Controller/delete-task/'
const changestatusurl = 'http://'+host+'/Controller/update-status/'
const getuerurl = 'http://'+host+'/Controller/get-user'
//Login Page script
const loginform = document.getElementById('loginform')
loginform.addEventListener('submit', function (e) {
    e.preventDefault();

    username = document.getElementById('username').value
    password = document.getElementById('password').value

    logindata = {
        userName: `${username}`,
        password: `${password}`
    }
    fetch(Loginurl, {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": 'OPTIONS,POST,GET',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(logindata)
    }).then(function (response) {
        if (response.status == 400) {
            document.getElementById('username').style.border = "1px solid red"
            document.getElementById('password').style.border = "1px solid red"
        }
        else {                      
            document.getElementById('logpanel').style.display = "none"
            document.getElementById('regpanel').style.display = "none"
            document.getElementById('mainpage').style.display ="block"
        }
        return response.text()
    }).then(function (text) {
       CreateCookie(text)
       window.location.reload()
    })
})
//fuction to create cookie
function CreateCookie(authToken)
{     
     document.cookie = "name ="+authToken +";max-age ="+60*60*24*1+";SameSite=None;secure;"
}

function Logout(){
document.cookie = "name" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
window.location.reload()
}

//login registration toggle button
function OpenReg() {
    document.getElementById('logpanel').style.display = "none"
    document.getElementById('regpanel').style.display = "block"
    document.getElementById('mainpage').style.display = "none"
}
function OpenLogin() {
    document.getElementById('regpanel').style.display = "none"
    document.getElementById('logpanel').style.display = "block"
    document.getElementById('mainpage').style.display = "none"
}

//registration script
const RegForn = document.getElementById('registrationform')
RegForn.addEventListener('submit', function (e) {
    e.preventDefault()
    username = document.getElementById('regusername').value
    firstname = document.getElementById('regfirstname').value
    lastname = document.getElementById('reglastname').value
    password = document.getElementById('regpassword').value
    regdata = {
        "username": `${username}`,
        "firstName": `${firstname}`,
        "lastName": `${lastname}`,
        "password": `${password}`
    }
    fetch(RegUrl, {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": 'OPTIONS,POST,GET',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(regdata)
    }).then(function (response) {
        if (response.status == 200) {
            alert("Successfully Registers , please login!")
            document.getElementById('regpanel').style.display = "none"
            document.getElementById('logpanel').style.display = "block"
            document.getElementById('mainpage').style.display ="none"
        }
        return response.text();
    })
})

//Main File
if(document.cookie != "")
{
token =  document.cookie.replace("name=","")
getlist()
GetUser()
}
//list calling
Datenow()//date set calling
//function for getting today date
function Datenow()
{
     var today = new Date();
var datetoday = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
date = `Today's Task ${datetoday}`
document.getElementById('todaydate').innerHTML = date
}
//fetch task list
function getlist() {

    fetch(tasklisturl, {
        method: 'GET',
        headers: {
            'Authorization': "bearer " + token,
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": 'OPTIONS,POST,GET',
            'Content-Type': 'application/json; charset=UTF-8'
        },
    }).then(function (response) {
        return response.json()
    }).then(function (text) {
        tasklist(text)

    })
}
//function to populate task list
function tasklist(data) {
    var list = document.getElementById('TaskList')
    for (var i in data) {
        title = data[i].title
        task = data[i].whatToDo
        id = data[i].id
        taskstatus = data[i].isCompleted
        if (taskstatus) {
            showStatus = "Done"
            btnwork = "disabled"
        }
        else {
            showStatus = "Pending"
            btnwork = ""
        }
        var Task = ` <td>${title}</td>
        <td>${task}</td>
        <td><button type="button" class="btn"  id="status${i}"value="${id}" onclick="ChangeStatus(this.id)"  btnwork> ${showStatus}</button></td>
        <td><button type="button" class="btn" id="delete${i}"value="${id}" onclick="DeleteTask(this.id)"><img class="trashicon" src="Images/delete.png" alt="Delete"></button></td>
        `
        list.innerHTML += Task
    }
}
//function to get user name
function GetUser()
{
    fetch(getuerurl,{
        method: "GET",
        headers: {
            'Authorization': "bearer " + token,
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": 'OPTIONS,POST,GET',
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }).then(function(response){
        return response.json()
    }).then(function (text){
        document.getElementById("greetuser").innerHTML = "Welcome, "+text.firstName+" "+text.lastName
    })
}
//function to add task
function AddTask() {
    title = document.getElementById('tasktitle').value
    task = document.getElementById('tasktodo').value
    if (title == "") {
        document.getElementById('tasktitle').style.border = "1px solid red"
    }
    else if (task == "") {
        document.getElementById('tasktodo').style.border = "1px solid red"
    }
    else {
        document.getElementById('tasktitle').value = ""
        document.getElementById('tasktodo').value = ""
        data = {

            title: `${title}`,
            whatToDo: `${task}`
        }
        fetch(addtask, {
            method: "POST",
            headers: {
                'Authorization': "bearer " + token,
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": 'OPTIONS,POST,GET',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(data)
        }).then (function (response){
            if(response.status == 200)
            {           
                document.getElementById('TaskList').innerHTML = null
                getlist()
            }
            else{
                // redirect to login page
            }
        })
    }
}
function DeleteTask(id){
 taskId = document.getElementById(id).value
 urlbyid = deleteTaskurl+taskId
 fetch(urlbyid,{
     method: "DELETE",
     headers: {
        'Authorization': "bearer " + token,
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": 'OPTIONS,POST,GET',
        'Content-Type': 'application/json; charset=UTF-8'
     }
 }).then(function (response){
     if(response.status == 200)
     {
        document.getElementById('TaskList').innerHTML = null
        getlist()
     }
 })
}

//function to update status
function ChangeStatus(id)
{
    taskId = document.getElementById(id).value
    urlbyid = changestatusurl+taskId
    fetch(urlbyid,{
        method: "PUT",
        headers: {
           'Authorization': "bearer " + token,
           "Access-Control-Allow-Headers": "*",
           "Access-Control-Allow-Methods": 'OPTIONS,POST,GET',
           'Content-Type': 'application/json; charset=UTF-8'
        }
    }).then(function (response) {
        if(response.status == 200)
        {
            document.getElementById(id).innerHTML = "Done"
        }
    })
}
