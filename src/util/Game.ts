export default class Game{
    title: string;
    _title: string;
    score: Record<string, number>;
    constructor(title: string, players: string[]){
        this.title = title;
        this._title = title.toLocaleLowerCase();
        this.score = {};
        
        players.forEach((p) => this.addPlayer(p));
    }
    addPlayer(player?:string, score?: number) {
        if(player) {
            this.score[player] = score || 0;
        }
    }
}