import { MatchEvent, Action, Trigger, Configuration } from "./types"
import * as fs from 'fs'
import * as path from 'path'

export default class ConfigurationHelper {
    private static isActionValid = (json: any): boolean => {
        let parameters: any = json["parameters"]
        let isValid: boolean = typeof json["handler"] === 'string'
            && typeof json["name"] === 'string'
            && typeof parameters === 'object'
            && Object.keys(parameters)
                .every(key => parameters[key] !== null && parameters[key] !== typeof undefined)
                
        if (!isValid) {
            console.warn("Invalid action", json)
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
        let actions: any = json["do"]
        let matchEvents: any = json["on"]
        let isValid: boolean = json
            && Array.isArray(matchEvents) && matchEvents.every(this.isMatchEventValid)
            && Array.isArray(actions) && actions.every(this.isActionValid)

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

    private static toAction = (json: any): Action => {
        return {
            handler: json["handler"],
            name: json["name"],
            parameters: json["parameters"]
        }
    }

    private static toTrigger = (json: any): Trigger => {
        return {
            on: json["on"].map(this.toMatchEvent),
            do: json["do"].map(this.toAction)
        }
    } 

    private static createConfiguration = (json: any): Configuration => {
        if (!Array.isArray(json)) {
            throw new Error("Configuration is not an array");
        }
        return json.filter(this.isValid).map(this.toTrigger)
    }

    public static fromJson = (): Configuration => {
        // TODO: Un-hardcode
        let location = path.resolve(__dirname, '../configuration.json');
        let json = JSON.parse(fs.readFileSync(location, 'utf8'))
        return this.createConfiguration(json);
    }
}