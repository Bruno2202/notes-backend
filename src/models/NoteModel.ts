export class NoteModel {
    private id?: number;
    private userId: number;
    private typeId: number;
    private title?: string;
    private content?: string;
    private creationDate: Date;

    constructor(userId: number, noteTypeId: number, creationDate: Date, id?: number, title?: string, content?: string);
    constructor(note: NoteModel);
    constructor(arg: number | NoteModel, typeId?: number, creationDate?: Date, id?: number, title?: string, content?: string) {
        if (typeof arg === "number") {
            this.userId = arg;
            this.typeId = typeId!;
            this.creationDate = creationDate!;
            this.id = id;
            this.title = title;
            this.content = content;
        } else {
            const note = arg as NoteModel;
            this.userId = note.userId;
            this.typeId = note.typeId;
            this.content = note.content;
            this.creationDate = note.creationDate;
            this.id = note.id;
            this.title = note.title;
            this.content = note.content;
        }
    }

    set setId(id: number) { this.id = id; }
    set setUserId(userId: number) { this.userId = userId; }
    set setTypeId(typeId: number) { this.typeId = typeId; }
    set setTitle(title: string) { this.title = title; }
    set setContent(content: string) { this.content = content; }
    set setCreationDate(creationDate: Date) { this.creationDate = creationDate; }

    get getId() { return this.id; }
    get getUserId() { return this.userId; }
    get getTypeId() { return this.typeId; }
    get getTitle() { return this.title; }
    get getContent() { return this.content; }
    get getCreationDate() { return this.creationDate; }
}