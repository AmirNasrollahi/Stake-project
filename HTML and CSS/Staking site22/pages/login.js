const usernameowner = "amirali";
const passwordowner = 5311;
function checkowner() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var Result = document.getElementById('result');
    if (username == usernameowner && password == passwordowner) {
        Result.innerHTML = "you have access"
        Result.style.color = "green";
        window.location.replace("file:///D:/HTML/Staking%20site/Staking%20site22/pages/ownerset.html");    
    }
    else {
        Result.innerHTML = "you dont have access"
        Result.style.color = "red";
    }
    checkempty(username, password,Result);
}

function checkempty(user, pass,res) {
    if (user) {
        if (pass) {

        }
        else {
            res.innerHTML = "please complete Password"
            res.style.color = "red";
        }
    }
    else {
        res.innerHTML = "please complete username"
        res.style.color = "red";
    }
}

