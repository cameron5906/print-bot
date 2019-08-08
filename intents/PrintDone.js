const PrintQueueManager = require('../services/printQueueService');

module.exports = async (userInfo) => {
    const currentPrint = PrintQueueManager.getCurrentPrint();

    if(!currentPrint) return `I was not aware of an active print; did you make a mistake?`;

    PrintQueueManager.removeCurrentPrint();

    const nextUp = PrintQueueManager.getNextInQueue();

    if(nextUp) {
        return `Sounds good. Up next is "${nextUp.title}" for ${nextUp.userName}. I will let you know when the print starts!`;
    } else {
        return 'Got it. There are no other prints queued; I am on standby!';
    }
}