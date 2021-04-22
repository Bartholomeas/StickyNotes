const addBtn = document.querySelector('.add-btn');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const deleteBtn = document.querySelector('.delete-note');
const deleteAllBtn = document.querySelector('.delete-all-btn');

const noteArea = document.querySelector('.note-area');
const notePanel = document.querySelector('.note-panel');
const category = document.querySelector('#category');
const textarea = document.querySelector('#text');
const error = document.querySelector('.error');

let selectedValue;
let ID = 0;
const noteArr = [];

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('note')) {
        noteArr.push(...JSON.parse(localStorage.getItem('note')));


        for (let i = 0; i < noteArr.length; i++) {
            placeNote(noteArr[i]);

            const element = document.querySelectorAll('.note-title');

            if (element[i].innerText == 'Nauka') {
                element[i].parentElement.parentElement.style.background = '#86b6b7'
            } else if (element[i].innerText == 'Praca') {
                element[i].parentElement.parentElement.style.background = '#bb4e62'
            } else {
                element[i].parentElement.parentElement.style.background = '#81d2ac'

            }
        }
        console.log(noteArr);

        // // VVV SPOSOB FOREACH
        // element.forEach(el => {
        //     if (el.innerText == 'Nauka') {
        //         el.parentElement.parentElement.style.background = '#86b6b7'
        //     } else if (el.innerText == 'Praca') {
        //         el.parentElement.parentElement.style.background = '#bb4e62'
        //     } else {
        //         el.parentElement.parentElement.style.background = '#81d2ac'

        //     }
        // })

    }
});

// dodawanie notatek do LS
const addNotes = () => {
    const myNote = {
        id: ID,
        value: selectedValue,
        text: textarea.value
    };

    noteArr.push(myNote);
    localStorage.setItem('note', JSON.stringify(noteArr));
};


const openPanel = () => {
    notePanel.style.display = 'flex';
};

const closePanel = () => {
    notePanel.style.display = 'none';
    error.style.visibility = 'hidden';
    textarea.value = '';
    category.selectedIndex = 0;
};

const addNote = () => {
    if (textarea.value !== '' && category.options[category.selectedIndex].value !== '0') {
        createNote();
        error.style.visibility = 'hidden';
    } else {
        error.style.visibility = 'visible';
    }
}



const createNote = () => {
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.setAttribute('id', ID);

    newNote.innerHTML = `
    <div class="note-header">
                <h3 class="note-title">${selectedValue}</h3>
                <button class="delete-note" onclick="deleteNote(${ID})">X</button>
            </div>

            <div class="note-body">
              <p>${textarea.value}</p>
            </div>
    `


    noteArea.appendChild(newNote);
    addNotes(newNote);
    ID++;

    textarea.value = '';
    category.selectedIndex = 0;
    notePanel.style.display = 'none';
    checkColor(newNote);
    console.log(newNote);
};

const placeNote = note => {

    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.setAttribute('id', note.id);

    newNote.innerHTML = `
    <div class="note-header">
                <h3 class="note-title">${note.value}</h3>
                <button class="delete-note" onclick="deleteNote(${note.id})">X</button>
            </div>

            <div class="note-body">
              <p>${note.text}</p>
            </div>
    `

    noteArea.appendChild(newNote)
    // console.log(newNote);

};

const selectValue = () => {
    selectedValue = category.options[category.selectedIndex].text;
};


const checkColor = note => {
    switch (selectedValue) {
        case 'Nauka':
            note.style.background = '#86b6b7';
            break;
        case 'Praca':
            note.style.background = '#bb4e62';
            break;
        case 'Inne':
            note.style.background = '#81d2ac';
            break;
    }
};

const noteDelete = e => {
    console.log(e.target.getAttribute('id'));
};

const deleteNote = id => {
    const noteToDelete = document.getElementById(id);
    // console.log(noteToDelete.innerHTML);
    noteArea.removeChild(noteToDelete);
    // localStorage.removeItem(`note${ID}`);
};

const deleteAllNotes = () => {
    noteArea.textContent = '';
    localStorage.clear();
};

addBtn.addEventListener('click', openPanel);
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', addNote);
deleteAllBtn.addEventListener('click', deleteAllNotes);

window.addEventListener('click', noteDelete)