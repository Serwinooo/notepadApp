// Fetch and display notes from localStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editingIndex = -1;

function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';  // Clear previous content

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
    notes[index].bookmarked = !notes[index].bookmarked; // Toggle the bookmarked state
    localStorage.setItem('notes', JSON.stringify(notes)); // Update localStorage
}

// Delete a note by index
function deleteNote(index) {
    if (confirm('Are you sure you want to delete this note?')) {
        notes.splice(index, 1);  // Remove the note
        localStorage.setItem('notes', JSON.stringify(notes));  // Update localStorage
        displayNotes();  // Refresh the displayed notes
    }
}

// Edit a note by index
function editNote(index) {
    editingIndex = index;
    const note = notes[index];

    // Show the edit form and populate with the note's current content
    document.getElementById('editForm').style.display = 'block';
    document.getElementById('editTitle').value = note.title;
    document.getElementById('editContent').innerHTML = note.content;

    // Focus the title input to make sure it's ready for editing
    document.getElementById('editTitle').focus();
}

// Update the note in localStorage
document.getElementById('updateBtn').addEventListener('click', function() {
    if (editingIndex > -1) {
        const updatedTitle = document.getElementById('editTitle').value;
        const updatedContent = document.getElementById('editContent').innerHTML;

        if (updatedTitle && updatedContent) {
            // Update the note object
            notes[editingIndex].title = updatedTitle;
            notes[editingIndex].content = updatedContent;
            notes[editingIndex].date = new Date().toLocaleString();  // Update the date

            // Save back to localStorage
            localStorage.setItem('notes', JSON.stringify(notes));

            // Hide the edit form and refresh the notes display
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

// Text formatting functions (same as in the create note page)
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

// Display the notes when the page loads
displayNotes();
