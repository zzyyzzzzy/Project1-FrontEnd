
const descriptionBody = document.getElementById("description-body"); 
const baseurl = "http://localhost:8080/";

document.addEventListener("submit", async (event) => {
    event.preventDefault();
    const description = descriptionBody.value;

    const response = await fetch(`${url}/complaints`, {
        method: "POST",
        body: JSON.stringify(description),
        headers:{
            "Content-Type":"application/json"
        }
    });
    
});