const usernameBody = document.getElementById("username-body");
const pwdBody = document.getElementById("pwd-body");

const baseUrl = "https://zzj-proj1-server.ashygrass-f1ffcec2.westus.azurecontainerapps.io";


document.addEventListener("submit", async event => {
    event.preventDefault();

    const username = usernameBody.value;
    const password = pwdBody.value;
    const credentials = {username,password};

    const httpResponse = await fetch(`${baseUrl}/login`, {
        method:"POST",
        body:JSON.stringify(credentials),
        headers:{
            'Content-Type':"application/json"
        }
    });

    if(httpResponse.status === 200){
        const app_user = await httpResponse.json();
        if (app_user.approved){
            app_user.password = null;
            localStorage.setItem("app_user", JSON.stringify(app_user));
            alert("login successful");
            window.location = "index.html";
        } else{
            alert("Your account is wating for approval");
        }
        
        // localStorage.clear();
    }

    if(httpResponse.status === 404){
        alert("username not found");
    }

    if(httpResponse.status === 403){
        alert("password does not match");
    }



});