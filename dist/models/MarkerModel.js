export class MarkerModel {
    id;
    userId;
    description;
    constructor(arg, description, id) {
        if (typeof arg === "number") {
            this.userId = arg;
            this.description = description;
            this.id = id;
        }
        else {
            const marker = arg;
            this.userId = marker.userId;
            this.description = marker.getDescription;
            this.id = marker.id;
        }
    }
    set setId(id) { this.id = id; }
    set setUserId(userId) { this.userId = userId; }
    set setDescription(description) { this.description = description; }
    get getId() { return this.id; }
    get getUserId() { return this.userId; }
    get getDescription() { return this.description; }
}
