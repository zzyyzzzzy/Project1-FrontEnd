const userLinks = document.getElementById("user-links")


const constructList = (info) => {
    for(const curInfo of info){
        const li = document.createElement("li");
        li.classList.add("nav-item");
        const a = document.createElement("a");
        a.classList.add("nav-link");
        a.innerText = curInfo.innerText;
        a.href = curInfo.herf;
        li.appendChild(a);
        userLinks.appendChild(li);
    }
}

const renderSignIn = ()=>{
    userLinks.innerHTML = "";
    const info = [
        {
            innerText: "Report a Complaint",
            herf: "../html/create_complaint.html"
        },
        {
            innerText: "View Meetings",
            herf: "../html/view_meetings.html"
        },
        {
            innerText: "Login",
            herf: "../html/login.html"
        },
        {
            innerText: "Sign up",
            herf: "../html/sign_up.html"
        }
    ]
    constructList(info);
}

const renderSignOut = () => {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    const a = document.createElement("a");
    a.classList.add("nav-link");
    a.innerText = "Sign Out"
    a.addEventListener("click", (e)=>{
        localStorage.removeItem("app_user");
        renderSignIn();
        window.location = "../html/index.html"
    });
    li.appendChild(a);
    userLinks.appendChild(li);
}

const renderSignInAsConsitutent = () => {
    userLinks.innerHTML = "";
    const info = [
        {
            innerText: "Report a Complaint",
            herf: "../html/create_complaint.html"
        },
        {
            innerText: "View Meetings",
            herf: "../html/view_meetings.html"
        }
    ]
    constructList(info);
    renderSignOut();
}


const renderSignInAsCouncil = () => {
    userLinks.innerHTML = "";
    const info = [
        {
            innerText: "Create a Meeting",
            herf: "../html/create_meeting.html"
        },
        {
            innerText: "View Meetings",
            herf: "../html/view_meetings.html"
        },
        {
            innerText: "Review Complaints",
            herf: "../html/review_complanits.html"
        },
        {
            innerText: "Review Accounts",
            herf: "../html/review_accounts.html"
        }
    ]
    constructList(info);
    renderSignOut();
}

function renderComponents(){
    const app_user = JSON.parse(localStorage.getItem("app_user"));
    if(app_user == null){
        renderSignIn();
    } else if(app_user.title === "CONSTITUENT"){
        console.log("here!");
        renderSignInAsConsitutent();
        
    } else if(app_user.title === "COUNCIL"){
        renderSignInAsCouncil();
    } else{
       alert("Somthing went wrong");
    }
}

{/* <li class="nav-item">
<a class="nav-link" aria-current="page" href="#">Login</a>
</li>
<li class="nav-item">
<a class="nav-link" href="#">Sign Up</a>
</li> */}

renderComponents();