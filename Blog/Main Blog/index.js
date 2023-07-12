//State
let allDataBlog = [];
let amountPost = false;

//Auth Post
if(!amountPost && allDataBlog.length==0){
    let postListContainer = document.getElementById("post-list");
    let temp = `
        <div class="card mt-4" style="margin: auto;">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-9">
                        <p class="card-text">Please Wait 3 Second! We're delivering the data for u 🙂</p>
                    </div>
                </div>
            </div>
        </div>`
    postListContainer.innerHTML = temp;
}

//Built in Function
function getToken() {
    let newToken = localStorage.getItem("token");
    return newToken;
}
function load(){
    getAllBlog();
    setTimeout(loadBlogCard, 3000);
}
localStorage.setItem("token", "f4044b84-5e60-4dc7-8250-27bd589b428a");


//Fetch API
const likeBlog = async function(idBlog) {
    const request = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `bearer ${getToken()}`
        },
        body: JSON.stringify({
            id: idBlog
        })
    };
    
    let response = await fetch("https://sistech-api.vercel.app/blog/like", request);
    let data = await response.json();
    load();
}

const addBlog = async function(titleBlog, contentBlog){
    document.getElementById("addPostButton").setAttribute("disabled","");
    const request = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `bearer ${getToken()}`
        },
        body: JSON.stringify({
            title: titleBlog,
            content: contentBlog
        })
    };
    
    let response = await fetch("https://sistech-api.vercel.app/blog", request);
    let data = await response.json();
    allDataBlog = data;
    load();
    document.getElementById("addPostButton").removeAttribute("disabled");
}

const editBlog = async function(idBlog, titleBlog, contentBlog){
    const request = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `bearer ${getToken()}`
        },
        body: JSON.stringify({
            title: titleBlog,
            content: contentBlog,
            id: idBlog
        })
    };

    let response = await fetch("https://sistech-api.vercel.app/blog", request);
    let data = await response.json();
    allDataBlog = data;
    load();
}

const getAllBlog = async function(){
    const request = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `bearer ${getToken()}`
        },
    };

    let response = await fetch("https://sistech-api.vercel.app/blog", request);
    let data = await response.json();
    allDataBlog = data;
    console.log(allDataBlog)
}


//Load Post
function loadBlogCard() {
    let postListContainer = document.getElementById("post-list");
    let temp="";
    let i=0;
    if(allDataBlog.length != 0){
        allDataBlog.map((post) => {
            temp = temp +
            `<div class="card mt-4" style="width: 25rem;">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-9">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.content}</p>
                        </div>
                    </div>
                </div>
            </div>`;
            i++;
        });
        amountPost = true;
    } else {
        temp = temp + `
        <div class="card mt-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-9">
                        <p class="card-text">There aren't any post.</p>
                    </div>
                </div>
            </div>
        </div>
        `
    }
    
    postListContainer.innerHTML = temp;
};


//Handle
function addBlogHandle(e) {
    let title = document.getElementById("input-title").value;
    let content = document.getElementById("input-content").value;
    if(title.length > 1 && content.length > 1) {
        addBlog(title, content);
        e.preventDefault();
    }
}

function editBlogHandle(e) {
    document.getElementById("editPostButton").setAttribute("disabled","");
    let prevTitle = document.getElementById("input-title-prev").value;
    let prevContent = document.getElementById("input-content-prev").value;
    
    let newTitle = document.getElementById("input-title-new").value;
    let newContent = document.getElementById("input-content-new").value;

    let idBlog = "";
    allDataBlog.forEach(element => {
        if(element.title == prevTitle && element.content == prevContent){
            idBlog=element.id;
        }
    });

    if(idBlog!=""){
        editBlog(idBlog, newTitle, newContent);
    }
    document.getElementById("editPostButton").removeAttribute("disabled");
}

//Add Event Listener
const refreshButton = document.getElementById("refresh");
refreshButton.addEventListener("click", load);

const addButton = document.getElementById("addPostButton");
addButton.addEventListener("click", addBlogHandle);

const editButton = document.getElementById("editPostButton");
editButton.addEventListener("click", editBlogHandle);

load();
