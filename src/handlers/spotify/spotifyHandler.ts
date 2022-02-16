import { Action } from '../../types'
import { Handler } from '../handler'
import SpotifyWebApi from 'spotify-web-api-node'

export default class SpotifyHandler implements Handler {
    private HANDLER_NAME = 'spotify'
    private spotifyClient: SpotifyWebApi
    public constructor () {
        // TODO: Initialize with credentials
        // and pass params from handlers constructor
        this.spotifyClient = new SpotifyWebApi({})
    }

    public handle = (action: Action) => {
        if (action.handler !== this.HANDLER_NAME) return

        console.info(this.HANDLER_NAME + ' handler received ' + action.name + ' action ')

        switch (action.name.toLowerCase()) {
            case 'change_volume':
                this.handleChangeVolumeAction(action)
                break;
            default:
                console.info('Unknown action for ' + this.HANDLER_NAME)
        }
    }

    private handleChangeVolumeAction = (action: Action) => {
        let levelPercentage = parseInt(action.parameters['levelPercentage'])
        if (isNaN(levelPercentage)) {
            console.info('Invalid parameter' + action.parameters['levelPercentage'])
            return
        } 

        this.spotifyClient
            .setVolume(levelPercentage)
            .then(() => console.info('Volume was changed'))
            .catch(console.error)
    }
}