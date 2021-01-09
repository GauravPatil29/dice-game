export class User {
    username: string;
    nickname: string;
    password: string;
    role: string;

    constructor(username: string, nickname: string, password: string, role: string) {
        this.username = username;
        this.nickname = nickname;
        this.password = password;
        this.role = role;
    }
}
