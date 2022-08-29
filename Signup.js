
const fnameBody = document.getElementById("fname-body"); 
const lnameBody  = document.getElementById("lname-body"); 
const userNameBody = document.getElementById("username-body");
const pwdBody = document.getElementById("pwd-body");


const baseUrl = "https://zzj-proj1-server.ashygrass-f1ffcec2.westus.azurecontainerapps.io";

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
        window.location = "index.html";
    }else{
        alert("Something went wrong!");
    }
});