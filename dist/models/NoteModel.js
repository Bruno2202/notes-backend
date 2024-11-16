"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteModel = void 0;
class NoteModel {
    id;
    userId;
    typeId;
    title;
    content;
    creationDate;
    color;
    markers;
    constructor(userId, typeId, creationDate, id, title, content, color, markers) {
        this.userId = userId;
        this.typeId = typeId;
        this.creationDate = creationDate;
        this.id = id;
        this.title = title;
        this.content = content;
        this.color = color;
        this.markers = markers;
    }
    set setId(id) { this.id = id; }
    set setUserId(userId) { this.userId = userId; }
    set setTypeId(typeId) { this.typeId = typeId; }
    set setTitle(title) { this.title = title; }
    set setContent(content) { this.content = content; }
    set setCreationDate(creationDate) { this.creationDate = creationDate; }
    set setColor(color) { this.color = color; }
    set setMarkers(markers) { this.markers = markers; }
    get getId() { return this.id; }
    get getUserId() { return this.userId; }
    get getTypeId() { return this.typeId; }
    get getTitle() { return this.title; }
    get getContent() { return this.content; }
    get getCreationDate() { return this.creationDate; }
    get getColor() { return this.color; }
    get getMarkers() { return this.markers; }
}
exports.NoteModel = NoteModel;
