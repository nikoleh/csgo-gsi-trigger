import { Action } from '../../types'
import { Handler } from '../handler'

export default class LoggingHandler implements Handler {
    public handle = (action: Action) => {
        console.info('Action ' + action.name + ' received with parameters ' + JSON.stringify(action.parameters))
    }
}