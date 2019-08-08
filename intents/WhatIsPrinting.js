const PrintQueueManager = require('../services/printQueueService');

module.exports = async () => {
    const currentPrint = PrintQueueManager.getCurrentPrint();

    if(!currentPrint) return `There doesn't seem to be anything printing at the moment.`;

    return `I'm currently working on "${currentPrint.title}" from the ${currentPrint.category} category:
    ${currentPrint.url}`;
}