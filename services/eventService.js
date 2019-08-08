let activeListeners = {};

module.exports = {
    start: (name, listener, interval) => {
        if(activeListeners[name]) clearInterval(activeListeners[name]);
        activeListeners[name] = setInterval(listener, interval);
    },
    stop: (name) => {
        clearInterval(activeListeners[name]);
    },
    printEndedEvent: () => {
        console.log('Checking to see if the print is complete');
    },
    waitingForTemps: () => {
        console.log('Checking to see if the bed and extruder are the correct temp...');
    },
    checkForNightlyShutdown: () => {
        console.log('Checking to see if I should turn off the smart switch...');
    },
    checkForMorningStartup: () => {
        console.log('Checking to see if I can turn the printer back on...');
    },
    checkIfPrintNearCompletion: () => {
        console.log('Checking to see if I should tell the user their print is almost done...');
    }
}