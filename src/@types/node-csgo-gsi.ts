declare module "node-csgo-gsi" {
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

    import { EventEmitter } from "events";
    class CSGOGSI extends EventEmitter {
        constructor(options: {port: number, authToken: string[]});

        on(eventName: 'player', listener: (player: Player) => void): this;
    }

    export default CSGOGSI
}