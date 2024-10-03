// Save note to localStorage
document.getElementById('saveBtn').addEventListener('click', function () {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').innerHTML; // Get HTML content

    if (title && content) {
        const note = {
            title: title,
            content: content,
            date: new Date().toLocaleString()
        };

        // Store note in localStorage
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));

        alert('Note saved successfully!');
        // Clear fields after saving
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteContent').innerHTML = '';
    } else {
        alert('Please enter a title and content.');
    }
});

// Function to format text (bold, italic)
function formatText(command) {
    document.execCommand(command, false, null);
}

// Function to change font size
function changeFontSize() {
    const size = document.getElementById('fontSize').value;
    document.execCommand('fontSize', false, size);
}

// Function to create an unordered list
function createList() {
    document.execCommand('insertUnorderedList', false, null);
}

// Function to create a simple 2x2 table
function createTable() {
    const tableHTML = '<table border="1" style="width:100%;"><tr><td>Row 1 Col 1</td><td>Row 1 Col 2</td></tr><tr><td>Row 2 Col 1</td><td>Row 2 Col 2</td></tr></table>';
    document.getElementById('noteContent').focus();
    document.execCommand('insertHTML', false, tableHTML);
}


document.getElementById('backBtn').onclick = function () {
    location.href = '../index.html';
}