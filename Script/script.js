let token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU3ByaW5nIiwiZXhwIjoxNjUyOTc5NzEzfQ.-vPuCNiUu2dnfSZ2FWkKZldOqZO8r2E8fh5TIw3FATA"
//end points 
const Loginurl = 'http://localhost:5003/Controller/login'
const RegUrl = 'http://localhost:5003/Controller/register-user'
const tasklisturl = 'http://localhost:5003/Controller/get-today-task'
const addtask = 'http://localhost:5003/Controller/add-task'
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
            token = response.text()
        }
    }).then(function (text) {

    })
})

//login registration toggle button
function OpenReg() {
    document.getElementById('logpanel').style.display = "none"
    document.getElementById('regpanel').style.display = "block"
}
function OpenLogin() {
    document.getElementById('regpanel').style.display = "none"
    document.getElementById('logpanel').style.display = "block"
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
        }
        return response.text();
    })
})

//Main File
getlist() //list calling
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
        taskstatus = data[i].isCompleted
        if (taskstatus) {
            showStatus = "Done"
        }
        else {
            showStatus = "Pending"
        }
        var Task = ` <td>${title}</td>
        <td>${task}</td>
        <td><button type="button" class="btn">${showStatus}</button></td>
        <td><button type="button" class="btn"><img class="trashicon" src="Images/delete.png" alt="Delete"></button></td>
        `
        list.innerHTML += Task
    }
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
