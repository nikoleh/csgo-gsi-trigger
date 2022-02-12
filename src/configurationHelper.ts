import { MatchEvent, Execution, Trigger, Configuration } from "./types"
import * as fs from 'fs'
import * as path from 'path'

export default class ConfigurationHelper {
    private static isExecutionValid = (json: any): boolean => {
        let parameters: any = json["parameters"]
        let isValid: boolean = typeof json["integration"] === 'string'
            && typeof json["action"] === 'string'
            && Array.isArray(parameters)
            && parameters
                .every(parameter => Object
                    .values(parameter)
                        .every(value => typeof value === 'number'))

        if (!isValid) {
            console.warn("Invalid execution", json)
        }

        return isValid
    }

    private static isMatchEventValid = (json: any): boolean => {
        let isValid: boolean = typeof json["eventType"] === "string"
            && typeof json["eventPhase"] === "string"

        if (!isValid) {
            console.warn("Invalid match event")
        }

        return isValid
    }

    private static isValid = (json: any, index: number): boolean => {
        let executions: any = json["do"]
        let matchEvent: any = json["on"]
        let isValid: boolean = json
            && this.isMatchEventValid(matchEvent)
            && Array.isArray(executions) && executions.every(this.isExecutionValid)

        if (!isValid) {
            console.warn(`An invalid trigger found on index ${index}`)
        }

        return isValid
    }

    private static toMatchEvent = (json: any): MatchEvent => {
        return {
            eventType: json["eventType"],
            eventPhase: json["eventPhase"]
        }
    }

    private static toExecution = (json: any): Execution => {
        return {
            integration: json["integration"],
            action: json["action"],
            parameters: json["parameters"]
        }
    }

    private static toTrigger = (json: any): Trigger => {
        return {
            on: this.toMatchEvent(json["on"]),
            do: json["do"].map(this.toExecution)
        }
    } 

    private static parseJson = (json: any): Configuration => {
        if (!Array.isArray(json)) {
            throw new Error("Configuration is not an array");
        }
        return json.filter(this.isValid).map(this.toTrigger)
    }

    public static fromJson = (): Configuration => {
        // TODO: Un-hardcode
        let location = path.resolve(__dirname, 'configuration.json');
        let json = JSON.parse(fs.readFileSync(location, 'utf8'))
        return this.parseJson(json);
    }
}