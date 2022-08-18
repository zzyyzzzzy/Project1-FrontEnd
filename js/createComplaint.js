
const descriptionBody = document.getElementById("description-body"); 
const summaryBody = document.getElementById("summary-body"); 

const baseUrl = "http://localhost:8080";

document.addEventListener("submit", async (event) => {
    event.preventDefault();
    const description = {summary:summaryBody.value,
                        description:descriptionBody.value};
    
    console.log(description);
    const response = await fetch(`${baseUrl}/complaints`, {
        method: "POST",
        body: JSON.stringify(description),
        headers:{
            "Content-Type":"application/json"
        }
    });
    console.log(response);
    if(response.status === 201){
        alert("Successfully created a complaint");
        descriptionBody.value = "";
    }else{
        alert("Something went wrong!");
    }
});