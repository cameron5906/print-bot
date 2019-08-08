const SlackWeb = require('../wrappers/slack');
const Octoprint = require('../wrappers/octoprint');
const PrintQueueService = require('../services/printQueueService');

module.exports = async (fileData) => {
    const printInfo = PrintQueueService.popNextInQueue();

    if(!printInfo) return `There doesn't seem to be a print queued up?`;

    const data = await SlackWeb.getFileData(fileData.url_private_download);
    PrintQueueService.setCurrentPrint(printInfo);
    SlackWeb.sendMessage(`Hey! Just wanted to let you know that your print, ${printInfo.thingName}, is starting! I will send you a message when it's almost done.`, printInfo.userId);
    return `Okay, I'm uploading "${printInfo.thingName}" to the printer now. I will notify ${printInfo.userName} when the print is starting!`;
}