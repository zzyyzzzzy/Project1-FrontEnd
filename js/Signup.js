
const fnameBody = document.getElementById("fname-body"); 
const lnameBody  = document.getElementById("lname-body"); 
const userNameBody = document.getElementById("username-body");
const pwdBody = document.getElementById("pwd-body");


const baseUrl = "http://localhost:8080";

document.addEventListener("submit", async (event) => {
    event.preventDefault();
    const user = {
                    fname:fnameBody.value,
                    lname:lnameBody.value,
                    userName: userNameBody.value,
                    password: pwdBody.value
                };
    
    console.log(user);
    const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers:{
            "Content-Type":"application/json"
        }
    });
    console.log(response);
    if(response.status === 201){
        alert("Successfully requested an account");
        window.location = "../html/index.html";
    }else{
        alert("Something went wrong!");
    }
});