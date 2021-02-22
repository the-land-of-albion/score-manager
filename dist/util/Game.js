"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    constructor(title, players) {
        this.title = title;
        this._title = title.toLocaleLowerCase();
        this.score = {};
        players.forEach((p) => this.addPlayer(p));
    }
    addPlayer(player, score) {
        if (player) {
            this.score[player] = score || 0;
        }
    }
}
exports.default = Game;
//# sourceMappingURL=Game.js.map