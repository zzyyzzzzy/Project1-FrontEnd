const table = document.getElementById("complaint-table");
const baseUrl = "https://zzj-proj1-server.ashygrass-f1ffcec2.westus.azurecontainerapps.io";

const getComplaintlist = async () => {
    //https://api.coingecko.com/api/v3/coins
    const complaintRes = await fetch(`${baseUrl}/complaints`);
    const complaintBody = await complaintRes.json();
    return complaintBody;
    
};

const prorityMapper = priority => {
    switch(priority) {
        case "UASSIGNED":
            return 0;
        case "HIGH":
            return 1;
        case "LOW":
            return 2;
        default:
            return 3;
      }
};

const renderTable = async () => {
    const complaintList = await getComplaintlist();
    complaintList.sort((c1, c2) => prorityMapper(c2.priority) - prorityMapper(c1.priority));
    for(let i = 0; i < complaintList.length; i++){
        const element = complaintList[i];
        const {id, summary, priority, meetingId} = element;
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell();
        const cell2 = newRow.insertCell();
        const cell3 = newRow.insertCell();
        const cell4 = newRow.insertCell();
        const cell5 = newRow.insertCell();
        const meetingAssigned = meetingId == -1 ? "Not Assigned" : `Assigned to Meeting ${meetingId}`;
        cell1.innerText= i + 1;
        cell2.innerText = summary;
        cell3.innerText = meetingAssigned;
        cell4.innerText = priority;

        // if meeting assigned, you cannot change the priority
        if(meetingId != -1){
            const btnDisabled = document.createElement("button");
            btnDisabled .innerText = "Priority Change Disabled";
            btnDisabled.disabled = true;
            btnDisabled.classList.add("btn", "btn-light");
            cell5.appendChild(btnDisabled);
            continue;
        }
        // creating buttons
        const btnHigh = document.createElement("button");
        btnHigh.innerText = "High";
        btnHigh.classList.add("btn", "btn-primary");
        const btnLow = document.createElement("button");
        btnLow.innerText = "Low";
        btnLow.classList.add("btn", "btn-info", "ms-2");
        const btnIgnore = document.createElement("button");
        btnIgnore.innerText = "Ignore";
        btnIgnore.classList.add("btn", "btn-secondary", "ms-2");

        //setup click listener for buttons
        const btnCallBack = async e => {
            const response = await fetch(`${baseUrl}/complaints/${id}/${e.target.innerText}`, {
                method: "PATCH",
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if (response.status == 200){
                const updatedBody = await response.json();
                cell4.innerText = updatedBody.priority;
            } else{
                console.error(response);
                alert("Somthing wet wrong during update the prority")
            }
        }
        btnHigh.addEventListener("click", btnCallBack);
        btnLow.addEventListener("click", btnCallBack);
        btnIgnore.addEventListener("click", btnCallBack);
        cell5.appendChild(btnHigh);
        cell5.appendChild(btnLow);
        cell5.appendChild(btnIgnore);
        

    }
}

renderTable();