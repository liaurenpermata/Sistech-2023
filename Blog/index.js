let stateData = {
    "username":"username",
    "token":"token",
};

const getUsernameToken = async function(username){
    const request = {
        method: 'POST',
        body: JSON.stringify({
            name : username
        }),
        headers: {
            'Content-type': 'application/json',
        },
    };

    let response = await fetch("https://sistech-api.vercel.app/token", request);
    let data = await response.json();
    localStorage.setItem(stateData.username, `${data.name}`);
    localStorage.setItem(stateData.token, `${data.token}`);
}

function onSubmitUsername(e) {
    var username = document.getElementById("form-username");
    if(username.value.length>1){
        // getUsernameToken(username.value);
        localStorage.setItem(stateData.token, "f4044b84-5e60-4dc7-8250-27bd589b428a");
        document.getElementById("modal-backdrop-profile").classList.remove("d-none");
        document.getElementById("modal-profile").classList.add("d-block");
        document.getElementById("profile-name").innerText = username.value;
        e.preventDefault();
    }
}

const form = document.getElementById("form-profile");
form.addEventListener("submit", onSubmitUsername);