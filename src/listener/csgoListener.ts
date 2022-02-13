import { EventEmitter } from 'events'
import CSGOGSI, { Player } from 'node-csgo-gsi'

interface ListenerOptions {
    steamId: string,
    listenerPort: number,
    gsiToken: string
}

export default class CSGOListener extends EventEmitter {
    private steamId: string = ''

    private player: Player | null = null;

    constructor (options: ListenerOptions) {
        super()

        let gsi = new CSGOGSI({
            port: options.listenerPort,
            authToken: [options.gsiToken] 
        });

        this.steamId = options.steamId;

        gsi.on("player", this.handlePlayerUpdate.bind(this));
    }

    private isCorrectPlayer = (player: Player) => {
        return player.steamid === this.steamId
    }

    private handlePlayerUpdate = (updatedPlayer: Player) => {
        if (!this.isCorrectPlayer(updatedPlayer)) return

        if (this.player) {
            if (updatedPlayer.match_stats.deaths > this.player.match_stats.deaths) {
                this.emit('death')
            }

            // TODO: Other things should indicate spawn as well
            if (this.player.state.health === 0 && updatedPlayer.state.health === 100) {
                this.emit('spawn')
            }
        }

        this.player = updatedPlayer;
    }
}