const Dialogflow = require('./dialogflow');
const Slack = require('./slack');
const {
    ShowWebcam,
    AddToQueue,
    NextInQueue,
    FullQueue,
    CancelPrint,
    PrintDone
} = require('./intents');

module.exports = async (message) => {
    const dialogflowResponse = await Dialogflow.process(message.user, message.text);
    const { result}  = dialogflowResponse;
    const { parameters, metadata} = result;

    const userInfo = await Slack.getUserInfo(message.user);
    console.log(userInfo);

    switch(metadata.intentName) {
        case 'ShowWebcam':
            const showWebcam = await ShowWebcam(message.channel);
            return showWebcam;
        case 'AddToQueue':
            const addToQueue = await AddToQueue(userInfo, parameters.url);
            return addToQueue;
        case 'NextInQueue':
            const nextInQueue = await NextInQueue();
            return nextInQueue;
        case 'FullQueue':
            const fullQueue = await FullQueue();
            return fullQueue;
        case 'CancelPrint':
            const cancelPrint = await CancelPrint();
            return cancelPrint;
        case 'PrintDone':
            const printDone = await PrintDone();
            return printDone;
        case 'PrintStarted':
            return '';
    } 
}