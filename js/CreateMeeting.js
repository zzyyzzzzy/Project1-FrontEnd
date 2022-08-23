const checkboxesGrid = document.getElementById("complaint-checkboxes");
const descriptionBody = document.getElementById("description-body");
const dateTime = document.getElementById("date-time"); 
const addressBody = document.getElementById("address-body"); 
const submitMeetingBtn = document.getElementById("submit-meeting");
let temp ;

const baseUrl = "http://localhost:8080";


const getComplaintlist = async () => {
    //https://api.coingecko.com/api/v3/coins
    const complaintRes = await fetch(`${baseUrl}/complaints`);
    const complaintBody = await complaintRes.json();
    return complaintBody;
    
};

const renderComplaintsTable = async () => {
    const complaintList = await getComplaintlist();
    let isEmpty = true;
    for(const complaint of complaintList){
        const {id, summary, priority, meetingId} = complaint;
        if(meetingId === -1 && priority!=='UNASSIGNED' && priority !== 'IGNORED'){
            isEmpty = false;
            const wrapper_div = document.createElement('div');
            wrapper_div.classList.add('form-check', 'form-check-inline');

            const checkbox = document.createElement('input');
            checkbox.classList.add('form-check-input');
            checkbox.type = 'checkbox';
            checkbox.value = id;

            const label = document.createElement('label');
            label.classList.add('form-check-label');
            label.innerText = `${summary} - ${priority}`;

            wrapper_div.appendChild(checkbox);
            wrapper_div.appendChild(label);
            checkboxesGrid.appendChild(wrapper_div);
        }
    }
    if (isEmpty){
        submitMeetingBtn.disabled = true;
        submitMeetingBtn.innerText = "No Complaints for Creating a Meeting";
    }
}
const meetingCreatedSuccessfully = () =>{
    alert("Meeting created successflly")
    console.log("complaints attached");
    descriptionBody.value = "";
    dateTime.value = "";
    addressBody.value = "";
    checkboxesGrid.innerHTML = "";
    renderComplaintsTable();
};
const attachComplaints = async(meetingId) => {
    const checkboxesGridChildren = checkboxesGrid.children;

    for(const child of checkboxesGridChildren){
        const curCheckbox = child.children[0];
        if(curCheckbox.checked){
           const complaintId = curCheckbox.value;
           const response = await fetch(`${baseUrl}/complaints/${complaintId }/meeting/${meetingId}`, {
                method: "PATCH",
                headers:{
                    "Content-Type":"application/json"
                }
            });
            if (response.status == 200){
                console.log("success")
            } else{
                console.error(response);
                alert("Somthing wet wrong during update the prority")
            }
        }
    }
    meetingCreatedSuccessfully();
};

document.addEventListener("submit", async (event) => {
    event.preventDefault();
    const meeting = {
                        description:descriptionBody.value,
                        location: addressBody.value,
                        meetingDate: Date.parse(Date(dateTime.value)) / 1000.0
                    };
                        
    temp = meeting;
    const response = await fetch(`${baseUrl}/meetings`, {
        method: "POST",
        body: JSON.stringify(meeting),
        headers:{
            "Content-Type":"application/json"
        }
    });
    if(response.status === 201){
        console.log("meeting created!")
        const meetingBody = await response.json();
        console.log(meetingBody);
        attachComplaints(meetingBody.id);
    }else{
        alert("Something went when creating the meeting!");
    }


});

renderComplaintsTable();

