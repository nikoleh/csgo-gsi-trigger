export interface MatchEvent {
    eventType: string,
    eventPhase: string
}

export interface Action {
    handler: string,
    name: string,
    parameters: Array<{[key: string]: number}>
}

export interface Trigger {
    on: MatchEvent[],
    do: Action[]
}

export type Configuration = Array<Trigger>