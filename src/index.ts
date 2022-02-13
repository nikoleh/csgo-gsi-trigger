import CSGOListener from "./listener/csgoListener"

let listener = new CSGOListener({ steamId: '', listenerPort: 3000, gsiToken: '' });

listener.on('death', () => console.log('you died at', Date.now()))
listener.on('spawn', () => console.log('you spawned at', Date.now()))