let token;

//Login Page script
const loginform = document.getElementById('loginform')
loginform.addEventListener('submit', function (e){
    e.preventDefault();

    username = document.getElementById('username').value
    password = document.getElementById('password').value
    const Loginurl = 'http://localhost:5003/Controller/login'
    data = {
        userName: `${username}`,
        password: `${password}`
    }
    detail = JSON.stringify(data)
    console.log(detail)
    fetch(Loginurl,{
        method: 'POST',
        headers:{
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": 'OPTIONS,POST,GET',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(function (response){
        if(response.status == 400)
        {
            document.getElementById('username').style.border = "1px solid red"
            document.getElementById('password').style.border = "1px solid red"
        }
        else {
            token = response.text()         
        }
        return response.text();     
    }).then(function (text){
          
    })
})

//login registration toggle button
function OpenReg()
{
    document.getElementById('logpanel').style.display ="none"
    document.getElementById('regpanel').style.display ="block"
}
function OpenLogin()
{
    document.getElementById('regpanel').style.display ="none"
    document.getElementById('logpanel').style.display ="block"
}

//registration script
const RegForn = document.getElementById('registrationform')
RegForn.addEventListener('submit',function (e){
    
})