# Notepad C

Notepad C is a web-based notepad application that allows you to create, view, bookmark, edit, and manage your notes. It includes a trash system that holds deleted notes for 7 days before they are permanently deleted. The trash also allows you to restore or permanently remove notes manually.

## Features

1. **Create New Notes**  
   You can create new notes with a title and formatted text, including options for:
   - Bold and italic text
   - Lists and tables
   - Drawing using a canvas
   - Uploading images or PDF files

2. **View Saved Notes**  
   View and manage all previously saved notes.

3. **Bookmark Notes**  
   Important notes can be bookmarked, storing them in `importantnotes.html` for easy access.

4. **Edit Notes**  
   All notes can be edited after creation.

5. **Trash Notes**  
   Deleted notes are moved to `trashNotes.html`, where they are stored for 7 days before being permanently deleted. From the Trash page, you can:
   - **Restore Notes**: Bring back deleted notes before they are permanently removed.
   - **Permanently Delete Notes**: Force remove specific notes immediately without waiting for 7 days.

## Trash Management

- Notes moved to the trash will be automatically deleted after 7 days.
- While in the trash, notes can be restored or permanently deleted manually.

## How to Use

1. **Create a Note**: Click the "Create New Note" button on the main page to open a new note editor where you can input your content.
2. **Save a Note**: After editing, click "Save" to store the note.
3. **View or Edit Notes**: Use the "View Notes" button to open and manage existing notes.
4. **Bookmark a Note**: If a note is important, click "Bookmark Notes" to store it in the `importantnotes.html` file.
5. **Delete a Note**: Move unwanted notes to the trash by clicking the "Trash" button.
6. **Manage Trash**: Access the trash to restore or permanently delete notes within the 7-day window.

## Files

- `index.html`: The main interface of Notepad C with options for creating, viewing, bookmarking, and trashing notes.
- `newNote.html`: The note creation page where users can format and save notes.
- `viewnotes.html`: The created notes will be stored, it can be edit, add to bookmark or delete.
- `importantotes.html`: The note bookmarked notes will be stored and fetch.
- `trashNotes.html`: The deleted notes will be stored for 7 days and can be quickly removed & restore.
- `createnote.js`: Functionalities for the page of newNote.html, note creation.
- `modifynotes.js`: Functionalities for the page of viewnotes and  importantnotes html, reusable because of same functionalities. The notes can be either edit, delete or add to bookmark.

## Development

### Built With

- HTML5
- CSS3
- JavaScript
- Electron

### Setup Instructions

1. Clone this repository or download the ZIP file.
2. Open `index.html` in your web browser to start using the Notepad C app.
