class Room {
    constructor(roomId, username, socketId) {
        this.roomId = roomId; // string
        this.players = []; // Array of Players
        this.host = { username, socketId };
    }
    addPlayer(player) {
        let i = this.getPlayerLength();
        if (i >= 4) {
            return null;
        } else {
            this.players.push(player);
        }
    }
    getPlayerLength() {
        return this.players.length;
    }
    removePlayer(username) {
        const removedPlayer = this.players.find(
            (player) => player.username === username
        );
        if (removedPlayer) {
            this.players = this.players.filter(
                (player) => player.username !== username
            );
            return removedPlayer;
        } else {
            return null;
        }
    }
}

export default Room;
