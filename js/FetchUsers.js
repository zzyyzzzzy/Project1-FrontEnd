const table = document.getElementById("user-table");
const baseUrl = "http://localhost:8080";

const getAllUsers = async () => {
    //https://api.coingecko.com/api/v3/coins
    const userRes = await fetch(`${baseUrl}/users`);
    const userBody = await userRes.json();
    return userBody;
    
};

const renderTable = async () => {
    const userList = await getAllUsers();
    let count = 0;
    for(const user of userList){
        const {id, fname, lname, userName, approved, title} = user;
        if(title === "COUNCIL"){
            continue;
        }
        count += 1;
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell();
        const cell2 = newRow.insertCell();
        const cell3 = newRow.insertCell();
        const cell4 = newRow.insertCell();
        const cell5 = newRow.insertCell();
        const cell6 = newRow.insertCell();
        const approvedMessage = approved? "approved" : "peding";

        cell1.innerText= count;
        cell2.innerText = fname;
        cell3.innerText = lname;
        cell4.innerText = userName;
        cell5.innerText = approvedMessage;
        // creating buttons
        const btnApprove = document.createElement("button");
        btnApprove.innerText = "Approve";
        btnApprove.classList.add("btn", "btn-primary");
        const btnDeny = document.createElement("button");
        btnDeny.innerText = "Deny";
        btnDeny.classList.add("btn", "btn-info", "ms-2");
        
        //setup click listener for buttons
        const btnCallBack = async e => {
            const response = await fetch(`${baseUrl}/users/${id}/${e.target.innerText}`, {
                method: "PATCH",
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if (response.status == 200){
                const updatedBody = await response.json();
                const approvedMessageNew = updatedBody.approved === "true"? "approved" : "peding";
                console.log(approvedMessage);
                console.log(typeof updatedBody.approved);
                cell5.innerText = approvedMessageNew;
            } else{
                console.error(response);
                alert("Somthing wet wrong during update the status")
            }
        }
        btnApprove.addEventListener("click", btnCallBack);
        btnDeny.addEventListener("click", btnCallBack);
        cell6.appendChild(btnApprove);
        cell6.appendChild(btnDeny);
        

    }
}

renderTable();