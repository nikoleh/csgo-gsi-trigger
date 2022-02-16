import { Handler } from './handler'
import LoggingHandler from './logging/loggingHandler'
import SpotifyHandler from './spotify/spotifyHandler'

export default [
    new LoggingHandler(),
    new SpotifyHandler()
] as Handler[]