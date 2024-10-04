// Fetch and display notes from localStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editingIndex = -1;

function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';  // Clear previous content

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    if (notes.length > 0) {
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.date}</p>
                <div>${note.content}</div>
                <label>
                    <input type="checkbox" onchange="toggleBookmark(${index})" ${note.bookmarked ? 'checked' : ''}> Bookmark
                </label>
                <button onclick="editNote(${index})">Edit</button>
                <button onclick="deleteNote(${index})">Delete</button>
                <hr>
            `;
            notesList.appendChild(noteElement);
        });
    } else {
        notesList.innerHTML = '<p>No notes available.</p>';
    }
}

// Toggle bookmark for a note
function toggleBookmark(index) {
    notes[index].bookmarked = !notes[index].bookmarked; 
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Delete a note by index
// Delete a note and move it to trash
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToDelete = notes[index];

    // Add the note to trash with a timestamp
    const trash = JSON.parse(localStorage.getItem('trash')) || [];
    noteToDelete.deletedAt = new Date().getTime(); // Save timestamp
    trash.push(noteToDelete);
    localStorage.setItem('trash', JSON.stringify(trash));

    // Remove the note from the original notes array
    notes.splice(index, 1); // Only delete the specific note
    localStorage.setItem('notes', JSON.stringify(notes));

    displayImportantNotes(); // Refresh the list
}


// Edit a note by index
function editNote(index) {
    editingIndex = index;
    const note = notes[index];

    document.getElementById('editForm').style.display = 'block';
    document.getElementById('editTitle').value = note.title;
    document.getElementById('editContent').innerHTML = note.content;

    document.getElementById('editTitle').focus();
}

// Update the note in localStorage
document.getElementById('updateBtn').addEventListener('click', function() {
    if (editingIndex > -1) {
        const updatedTitle = document.getElementById('editTitle').value;
        const updatedContent = document.getElementById('editContent').innerHTML;

        if (updatedTitle && updatedContent) {
            notes[editingIndex].title = updatedTitle;
            notes[editingIndex].content = updatedContent;
            notes[editingIndex].date = new Date().toLocaleString();

            localStorage.setItem('notes', JSON.stringify(notes));

            document.getElementById('editForm').style.display = 'none';
            displayNotes();
            alert('Note updated successfully!');
        } else {
            alert('Please fill in both title and content.');
        }
    }
});

// Cancel the editing process
function cancelEdit() {
    editingIndex = -1;
    document.getElementById('editForm').style.display = 'none';
}

// Text formatting functions
function formatText(command) {
    document.execCommand(command, false, null);
}

function changeFontSize() {
    const size = document.getElementById('fontSize').value;
    document.execCommand('fontSize', false, size);
}

function createList() {
    document.execCommand('insertUnorderedList', false, null);
}

function createTable() {
    const tableHTML = '<table border="1" style="width:100%;"><tr><td>Row 1 Col 1</td><td>Row 1 Col 2</td></tr><tr><td>Row 2 Col 1</td><td>Row 2 Col 2</td></tr></table>';
    document.getElementById('editContent').focus();
    document.execCommand('insertHTML', false, tableHTML);
}

// Function to toggle the drawing canvas
function toggleCanvas() {
    const canvas = document.getElementById('drawingCanvas');
    const button = document.getElementById('insertDrawingBtn');
    if (canvas.style.display === 'none') {
        canvas.style.display = 'block';
        button.style.display = 'inline-block';
        startDrawing();
    } else {
        canvas.style.display = 'none';
        button.style.display = 'none';
    }
}

// Drawing functionality
let drawing = false;
let context = null;

function startDrawing() {
    const canvas = document.getElementById('drawingCanvas');
    context = canvas.getContext('2d');

    canvas.addEventListener('mousedown', function() {
        drawing = true;
    });

    canvas.addEventListener('mouseup', function() {
        drawing = false;
        context.beginPath();
    });

    canvas.addEventListener('mousemove', function(event) {
        if (drawing) {
            context.lineWidth = 2;
            context.lineCap = 'round';
            context.strokeStyle = 'black';
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();
            context.beginPath();
            context.moveTo(event.offsetX, event.offsetY);
        }
    });
}

// Insert drawing into the note
function insertDrawing() {
    const canvas = document.getElementById('drawingCanvas');
    const dataURL = canvas.toDataURL();
    const imgHTML = `<img src="${dataURL}" alt="Drawing" style="max-width:100px; margin:5px 0;"/>`;
    document.getElementById('editContent').focus();
    document.execCommand('insertHTML', false, imgHTML);
    toggleCanvas();
}

// Handle file uploads
function handleFileUpload(event) {
    const files = event.target.files;
    const editContent = document.getElementById('editContent');

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgHTML = `<img src="${e.target.result}" alt="Image" style="max-width:100px; margin:5px 0;"/>`;
                editContent.focus();
                document.execCommand('insertHTML', false, imgHTML);
            };
            reader.readAsDataURL(file);
        } 
    }
}

// Initial load of notes
window.onload = displayNotes;
