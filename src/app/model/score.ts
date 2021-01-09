export class Score {
    nickname: string;
    score: number;
    time: number;

    constructor(nickname: string, score: number, time: number) {
        this.nickname = nickname;
        this.score = score;
        this.time = time;
    }
}
