const table = document.getElementById("meeting-table");
const baseUrl = "https://zzj-proj1-server.ashygrass-f1ffcec2.westus.azurecontainerapps.io";


const getAllComplaints = async () => {
    //https://api.coingecko.com/api/v3/coins
    const complaintRes = await fetch(`${baseUrl}/complaints`);
    const complaintBody = await complaintRes.json();
    return complaintBody;
    
};

const getAllMeetings = async () => {
    const meetingRes = await fetch(`${baseUrl}/meetings`);
    const meetingBody = await meetingRes.json();
    return meetingBody;
    
};

const renderTable = async () => {
    const meetingList = await getAllMeetings();
    const complaintList = await getAllComplaints();
    for(let i = 0; i < meetingList.length; i++){
        const element = meetingList[i];
        const {id, description, location, meetingDate} = element;
        if(id === -1){
            continue;
        }
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell();
        const cell2 = newRow.insertCell();
        const cell3 = newRow.insertCell();
        const cell4 = newRow.insertCell();
        const cell5 = newRow.insertCell();

        cell1.innerText= i;
        cell2.innerText = description;
        cell3.innerText = location;
        cell4.innerText = Date(meetingDate * 1000);

        const complaints = complaintList.filter(c => c.meetingId === id);
        for(let j = 0; j < complaints.length; j++){
            const complaint = complaints[j];
            const span = document.createElement("span");
            const innerText = j === complaints.length - 1? `${complaint.summary}` : `${complaint.summary}, `;
            span.innerText = innerText;
            cell5.appendChild(span);
        }
    }
}

renderTable();