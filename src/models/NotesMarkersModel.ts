export default class NotesMarkersModel {
    private noteId: number;
    private markerId: number;

    constructor(noteId: number, markerId: number);
    constructor(noteMarker: NotesMarkersModel);
    constructor(arg: number | NotesMarkersModel, markerId?: number) {
        if (typeof arg === "number") {
            this.noteId = arg;
            this.markerId = markerId!;
        } else {
            this.noteId = arg.noteId;
            this.markerId = arg.markerId;
        }
    }

    set setNoteId(noteId: number) { this.noteId = noteId; }
    set setMarkerId(markerId: number) { this.markerId = markerId; }

    get getNoteId() { return this.noteId; }
    get getMarkerId() { return this.markerId; }
}
