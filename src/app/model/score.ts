export class Score {
    nickname: string;
    score: number;
    time: Date;

    constructor(nickname: string, score: number, time: Date) {
        this.nickname = nickname;
        this.score = score;
        this.time = time;
    }
}
