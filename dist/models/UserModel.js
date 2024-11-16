"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
class UserModel {
    id;
    name;
    email;
    password;
    userPic;
    creationDate;
    constructor(arg, email, password, creationDate, id, userPic) {
        if (typeof arg === 'string') {
            this.name = arg;
            this.email = email;
            this.password = password;
            this.creationDate = creationDate;
            this.id = id;
            this.userPic = userPic || null;
        }
        else {
            const userModel = arg;
            this.name = userModel.getName;
            this.email = userModel.getEmail;
            this.password = userModel.getPassword;
            this.creationDate = userModel.creationDate;
            this.id = userModel.getId;
            this.userPic = userModel.getUserPic;
        }
    }
    set setId(id) { this.id = id; }
    set setName(name) { this.name = name; }
    set setEmail(email) { this.email = email; }
    set setPassword(password) { this.password = password; }
    set setUserPic(userPic) { this.userPic = userPic; }
    set setCreationDate(userPic) { this.creationDate = this.creationDate; }
    get getId() { return this.id; }
    get getName() { return this.name; }
    get getEmail() { return this.email; }
    get getPassword() { return this.password; }
    get getUserPic() { return this.userPic; }
    get getCreationDate() { return this.creationDate; }
}
exports.UserModel = UserModel;
