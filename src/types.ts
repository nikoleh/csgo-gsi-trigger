export interface MatchEvent {
    eventType: string,
    eventPhase: string
}

export interface Action {
    handler: string,
    name: string,
    parameters: Record<string, any>
}

export interface Trigger {
    on: MatchEvent[],
    do: Action[]
}

export type Configuration = Array<Trigger>