declare module "node-csgo-gsi" {
    import { EventEmitter } from "events";

    // MVP typings
    interface MatchStats {
        deaths: number
    }
    
    interface PlayerState {
        health: number
    }

    export interface Player {
        steamid: string,
        match_stats: MatchStats,
        state: PlayerState
    }

    class CSGOGSI extends EventEmitter {
        constructor(options: {port: number, authToken: string[]});

        on(eventName: 'player', listener: (player: Player) => void): this;
    }

    export default CSGOGSI
}