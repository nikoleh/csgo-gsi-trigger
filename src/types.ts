export interface MatchEvent {
    eventType: string,
    eventPhase: string
}

export interface Execution {
    integration: string,
    action: string,
    parameters: Array<{[key: string]: number}>
}

export interface Trigger {
    on: MatchEvent,
    do: Execution
}

export type Configuration = Array<Trigger>