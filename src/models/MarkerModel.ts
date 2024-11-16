export class MarkerModel {
    private id?: string;
    private userId: string;
    private description: string;

    constructor(userId: string, description: string, id?: string) {
        this.userId = userId;
        this.description = description;
        this.id = id;
    }

    set setId(id: string) { this.id = id; }
    set setUserId(userId: string) { this.userId = userId; }
    set setDescription(description: string) { this.description = description; }

    get getId() { return this.id; }
    get getUserId() { return this.userId; }
    get getDescription() { return this.description; }
}