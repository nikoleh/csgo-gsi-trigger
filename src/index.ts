import ConfigurationHelper from "./configurationHelper";
import CSGOListener from "./listener/csgoListener"

import handlers from './handlers'

let listener = new CSGOListener({ steamId: '', listenerPort: 3000, gsiToken: '' });

let triggers = ConfigurationHelper.fromJson()

triggers
    .forEach(trigger => trigger.on.forEach(
        matchEvent => listener.on(
            matchEvent.eventType, () => trigger.do.forEach(
                execution => handlers.forEach(
                    handler => handler.handle(execution))))))