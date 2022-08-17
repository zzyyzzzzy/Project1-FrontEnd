const table = document.getElementById("complaint-table");
const baseUrl = "http://localhost:8080";

const getComplaintlist = async () => {
    //https://api.coingecko.com/api/v3/coins
    const complaintRes = await fetch(`${baseUrl}/complaints`);
    const complaintBody = await complaintRes.json();
    return complaintBody;
    
};

const renderTable = async () => {
    const complaintList = await getComplaintlist();
    for(let i = 0; i < complaintList.length; i++){
        const element = complaintList[i];
        const {summary, priority, meetingId} = element;
        if(priority == "UNASSIGNED"){
            const element = complaintList[i];
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell();
        const cell2 = newRow.insertCell();
        const cell3 = newRow.insertCell();
        const cell4 = newRow.insertCell();
 
        const meetingAssigned = meetingId == -1 ? "Not Assigned" : `Assigned to Meeting ${meetingId}`;
        cell1.innerText= i + 1;
        cell2.innerText = summary;
        cell3.innerText = meetingAssigned;
        
        const btnHigh = document.createElement("button");
        btnHigh.innerText = "High";
        btnHigh.classList.add("btn", "btn-primary");
        const btnLow = document.createElement("button");
        btnLow.innerText = "Low";
        btnLow.classList.add("btn", "btn-info", "ms-2");
        const btnIgnore = document.createElement("button");
        btnIgnore.innerText = "Ignore";
        btnIgnore.classList.add("btn", "btn-secondary", "ms-2");
        cell4.appendChild(btnHigh);
        cell4.appendChild(btnLow);
        cell4.appendChild(btnIgnore);
        }
    }
}

renderTable();