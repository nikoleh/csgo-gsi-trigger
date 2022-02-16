import { Action } from '../../types'
import { Handler } from '../handler'

export default class SpotifyHandler implements Handler {
    private HANDLER_NAME = 'spotify'

    public handle = (action: Action) => {
        if (action.handler !== this.HANDLER_NAME) return

        console.info(this.HANDLER_NAME + ' handler received ' + action.name + ' action ');
        switch (action.name.toLowerCase()) {
            case 'change_volume':
                this.handleChangeVolumeAction(action)
                break;
            default:
                console.info('Unknown action for ' + this.HANDLER_NAME)
        }
    }

    private handleChangeVolumeAction = (action: Action) => {
        console.info('Handling change volume action')
    }
}