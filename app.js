console.log('This is todo app')
showNotes();

// If user adds a notes, add it to the localStorage 

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){
    let addText = document.getElementById('addText');
    let notes = localStorage.getItem('notes');
    if (notes == null){
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addText.value);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addText.value = '';
    console.log(notesObj);
    showNotes();
})

// function to show elements from the localStorage 
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null){
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function(element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
          <button id="${index}" onclick="editNote(this.id)" class="btn btn-primary">Edit Note</button>
        </div>
      </div>`;
    });


    let notesElm  = document.getElementById('notes');
    if (notesObj.length != 0 ){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to Show! "Add a Note" section above to add notes`;
    }
}



// function to delete a note

function deleteNote(index) {
    // console.log('I am deleting this note', index)
    let notes = localStorage.getItem('notes');
    if (notes == null){
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}

function editNote(element,index) {
    let updateCard = document.getElementById('updateCard')
    // console.log(upateCard)
    updateCard.classList.add('open')
    updateCard.classList.remove('close')
    

}


function updateNote(){
    let update = document.getElementById('updateCard')
    update.classList.add('close')
    update.classList.remove('open')
}


let search = document.getElementById('searchText');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName('noteCard')
    Array.from(noteCard).forEach(function (element) {
        let cardText = element.getElementsByTagName('p')[0].innerText;
        if(cardText.includes(inputVal)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }

    })
})
