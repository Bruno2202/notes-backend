"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkerModel = void 0;
class MarkerModel {
    id;
    userId;
    description;
    constructor(userId, description, id) {
        this.userId = userId;
        this.description = description;
        this.id = id;
    }
    set setId(id) { this.id = id; }
    set setUserId(userId) { this.userId = userId; }
    set setDescription(description) { this.description = description; }
    get getId() { return this.id; }
    get getUserId() { return this.userId; }
    get getDescription() { return this.description; }
}
exports.MarkerModel = MarkerModel;
