export class UserModel {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private userPic?: Blob | string | null;

    constructor(name: string, email: string, password: string, id?: number, userPic?: Blob | string | null);
    constructor(user: UserModel);
    constructor(arg: string | UserModel, email?: string, password?: string, id?: number, userPic?: Blob | string | null) {
        if (typeof arg === 'string') {
            this.name = arg;
            this.email = email!;
            this.password = password!;
            this.id = id;
            this.userPic = userPic || null;
        } else {
            const userModel = arg as UserModel;
            this.name = userModel.getName;
            this.email = userModel.getEmail;
            this.password = userModel.getPassword;
            this.id = userModel.getId;
            this.userPic = userModel.getUserPic;
        }
    }

    set setId(id: number) { this.id = id; }
    set setName(name: string) { this.name = name; }
    set setEmail(email: string) { this.email = email; }
    set setPassword(password: string) { this.password = password; }
    set setUserPic(userPic: string | null) { this.userPic = userPic; }

    get getId() { return this.id; }
    get getName() { return this.name; }
    get getEmail() { return this.email; }
    get getPassword() { return this.password; }
    get getUserPic() { return this.userPic; }
}