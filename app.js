console.log("welcome");
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTitle = document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  // Create an object to store both title and content
  let newNote = {
    title: addTitle.value,
    content: addTxt.value,
  };

  notesObj.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  addTitle.value = "";
  addTxt.value = "";

  showNotes();
});

// Update the showNotes function to handle title and content separately
function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (note, index) {
    html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${note.title}</h5>
                <p class="card-text">${note.content}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>`;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `There is nothing to show here. Use "Add Notes" section to add a note.`;
  }
}

// function to delete a node
function deleteNote(index) {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// Modify the search functionality to search both titles and contents
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCard = document.getElementsByClassName("noteCard");
  Array.from(noteCard).forEach(function (element) {
    let cardTitle = element
      .getElementsByTagName("h5")[0]
      .innerText.toLowerCase();
    let cardContent = element
      .getElementsByTagName("p")[0]
      .innerText.toLowerCase();

    // Check if either the title or content includes the input text
    if (cardTitle.includes(inputVal) || cardContent.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
