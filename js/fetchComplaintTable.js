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
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell();
        const cell2 = newRow.insertCell();
        const cell3 = newRow.insertCell();
        const cell4 = newRow.insertCell();
 
        const {summary, priority, meetingId} = element;
        const meetingAssigned = meetingId == -1 ? "Not Assigned" : `Assigned to Meeting ${meetingId}`;
        cell1.innerText= i + 1;
        cell2.innerText = summary;
        cell3.innerText = priority;
        cell4.innerText = meetingAssigned;

        // cell2.addEventListener("click", e => {
        //     sessionStorage.setItem("coinInfo", JSON.stringify(element));
        //     window.location.href="detailed.html";
        // });

    }
}

renderTable();