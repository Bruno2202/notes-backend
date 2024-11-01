export class NoteModel {
    id;
    userId;
    typeId;
    title;
    content;
    creationDate;
    constructor(arg, typeId, creationDate, id, title, content) {
        if (typeof arg === "number") {
            this.userId = arg;
            this.typeId = typeId;
            this.creationDate = creationDate;
            this.id = id;
            this.title = title;
            this.content = content;
        }
        else {
            const note = arg;
            this.userId = note.userId;
            this.typeId = note.typeId;
            this.content = note.content;
            this.creationDate = note.creationDate;
            this.id = note.id;
            this.title = note.title;
            this.content = note.content;
        }
    }
    set setId(id) { this.id = id; }
    set setUserId(userId) { this.userId = userId; }
    set setTypeId(typeId) { this.typeId = typeId; }
    set setTitle(title) { this.title = title; }
    set setContent(content) { this.content = content; }
    set setCreationDate(creationDate) { this.creationDate = creationDate; }
    get getId() { return this.id; }
    get getUserId() { return this.userId; }
    get getTypeId() { return this.typeId; }
    get getTitle() { return this.title; }
    get getContent() { return this.content; }
    get getCreationDate() { return this.creationDate; }
}
