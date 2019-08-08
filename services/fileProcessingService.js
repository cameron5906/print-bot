const SlackWeb = require('../wrappers/slack');
const Octoprint = require('../wrappers/octoprint');
const PrintQueueService = require('../services/printQueueService');

module.exports = async (fileData) => {
    const printInfo = PrintQueueService.popNextInQueue();

    if(!printInfo) return `There doesn't seem to be a print queued up?`;

    const data = await SlackWeb.getFileData(fileData.url_private_download);
    PrintQueueService.setCurrentPrint(printInfo);
    return `Okay, I'm uploading "${printInfo.thingName}" to the printer now. I will notify ${printInfo.userName} when the print is starting!`;
}