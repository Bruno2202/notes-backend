export default class NotesMarkersModel {
    noteId;
    markerId;
    constructor(arg, markerId) {
        if (typeof arg === "number") {
            this.noteId = arg;
            this.markerId = markerId;
        }
        else {
            this.noteId = arg.noteId;
            this.markerId = arg.markerId;
        }
    }
    set setNoteId(noteId) { this.noteId = noteId; }
    set setMarkerId(markerId) { this.markerId = markerId; }
    get getNoteId() { return this.noteId; }
    get getMarkerId() { return this.markerId; }
}
