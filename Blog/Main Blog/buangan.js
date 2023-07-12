function handleEditButton(editButton) {
    let i=0;
    for(j=0;j<editButton.length;j++){
        editButton[j].addEventListener("click", function(e) {
            console.log(editButton)
            // let titleTemp = document.getElementById(`input-title${i}`);
            // let contentTemp = document.getElementById(`input-content${i}`);
            //  editBlog(allDataBlog[i].id ,titleTemp, contentTemp)
            e.preventDefault();
        });
        i++;
    }
}


`<div class="col-md-3">
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-edit${i}-post">Edit</button>
    <button type="button" class="btn btn-primary" id="like-btn"><i class="fa-regular fa-heart"></i> ${post.like}</button>
</div>

<div class="modal fade" id="modal-edit${i}-post" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Add Your New Post!</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="input-title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="input-title${i}" value="${post.title}">
                </div>
                <div class="mb-3">
                    <label for="content-textarea" class="form-label">Content</label>
                    <input type="text" class="form-control" id="input-content${i}" value="${post.content}">
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary ${i}" id="edit-button">Add</button>
            </div>
        </div>
    </div>
</div>
</div>`