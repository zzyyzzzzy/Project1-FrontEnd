const table = document.getElementById("meeting-table");
const baseUrl = "http://localhost:8080";

const getAllMeetings = async () => {
    const meetingRes = await fetch(`${baseUrl}/meetings`);
    const meetingBody = await meetingRes.json();
    return meetingBody;
    
};

const renderTable = async () => {
    const meetingList = await getAllMeetings();
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
        cell1.innerText= i;
        cell2.innerText = description;
        cell3.innerText = location;
        cell4.innerText = Date(meetingDate * 1000);
    }
}

renderTable();