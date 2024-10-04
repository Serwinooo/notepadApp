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

// Function to insert the drawing into the note
function insertDrawing() {
    const canvas = document.getElementById('drawingCanvas');
    const dataURL = canvas.toDataURL();
    const imgHTML = `<img src="${dataURL}" alt="Drawing" style="max-width:100px; margin:5px 0;"/>`;
    document.getElementById('noteContent').focus();
    document.execCommand('insertHTML', false, imgHTML);
    toggleCanvas(); // Hide the canvas after inserting
}

// Handle file uploads
function handleFileUpload(event) {
    const files = event.target.files;
    const noteContent = document.getElementById('noteContent');

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgHTML = `<img src="${e.target.result}" alt="Image" style="max-width:100px; margin:5px 0;"/>`;
                noteContent.focus();
                document.execCommand('insertHTML', false, imgHTML);
            };
            reader.readAsDataURL(file);
        }        
    }
}

// Handle back button
document.getElementById('backBtn').onclick = function () {
    location.href = '../index.html';
}
