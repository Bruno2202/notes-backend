export class UserModel {
    id;
    name;
    email;
    password;
    userPic;
    constructor(arg, email, password, id, userPic) {
        if (typeof arg === 'string') {
            this.name = arg;
            this.email = email;
            this.password = password;
            this.id = id;
            this.userPic = userPic || null;
        }
        else {
            const userModel = arg;
            this.name = userModel.getName;
            this.email = userModel.getEmail;
            this.password = userModel.getPassword;
            this.id = userModel.getId;
            this.userPic = userModel.getUserPic;
        }
    }
    set setId(id) { this.id = id; }
    set setName(name) { this.name = name; }
    set setEmail(email) { this.email = email; }
    set setPassword(password) { this.password = password; }
    set setUserPic(userPic) { this.userPic = userPic; }
    get getId() { return this.id; }
    get getName() { return this.name; }
    get getEmail() { return this.email; }
    get getPassword() { return this.password; }
    get getUserPic() { return this.userPic; }
}
