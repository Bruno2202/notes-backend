export class MarkerModel {
    private id?: number;
    private userId: number;
    private description: string;

    constructor(userId: number, description: string, id?: number);
    constructor(marker: MarkerModel);
    constructor(arg: number | MarkerModel, description?: string, id?: number) {
        if (typeof arg === "number") {
            this.userId = arg!;
            this.description = description!;
            this.id = id;
        } else {
            const marker = arg as MarkerModel;
            this.userId = marker.userId;
            this.description = marker.getDescription;
            this.id = marker.id;
        }
    }

    set setId(id: number) { this.id = id; }
    set setUserId(userId: number) { this.userId = userId; }
    set setDescription(description: string) { this.description = description; }

    get getId() { return this.id; }
    get getUserId() { return this.userId; }
    get getDescription() { return this.description; }
}