import { MarkerModel } from "./MarkerModel";

export class NoteModel {
    private id?: string;
    private userId: string;
    private typeId: number;
    private title?: string | null;
    private content?: string | null;
    private creationDate: Date;
    private color?: string;
    private markers?: MarkerModel[]

    constructor(
        userId: string,
        typeId: number,
        creationDate: Date,
        id?: string,
        title?: string | null,
        content?: string | null,
        color?: string,
        markers?: MarkerModel[]
    ) {
        this.userId = userId;
        this.typeId = typeId;
        this.creationDate = creationDate;
        this.id = id;
        this.title = title;
        this.content = content;
        this.color = color;
        this.markers = markers;
    }

    set setId(id: string) { this.id = id; }
    set setUserId(userId: string) { this.userId = userId; }
    set setTypeId(typeId: number) { this.typeId = typeId; }
    set setTitle(title: string | null) { this.title = title; }
    set setContent(content: string | null) { this.content = content; }
    set setCreationDate(creationDate: Date) { this.creationDate = creationDate; }
    set setColor(color: string) { this.color = color; }
    set setMarkers(markers: MarkerModel[]) { this.markers = markers; }

    get getId() { return this.id; }
    get getUserId() { return this.userId; }
    get getTypeId() { return this.typeId; }
    get getTitle() { return this.title; }
    get getContent() { return this.content; }
    get getCreationDate() { return this.creationDate; }
    get getColor() { return this.color; }
    get getMarkers() { return this.markers; }
}