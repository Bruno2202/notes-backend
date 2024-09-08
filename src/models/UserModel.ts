export class UserModel {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private userPic?: string | null;

    constructor(name: string, email: string, password: string, id?: number, userPic?: string | null) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id;
        this.userPic = userPic;
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