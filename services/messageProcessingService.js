const Dialogflow = require('../wrappers/dialogflow');
const Slack = require('../wrappers/slack');
const {
    ShowWebcam,
    AddToQueue,
    NextInQueue,
    FullQueue,
    CancelPrint,
    PrintDone,
    WhatIsPrinting
} = require('../intents');

module.exports = async (message) => {
    const dialogflowResponse = await Dialogflow.process(message.user, message.text);
    const { result}  = dialogflowResponse;
    const { parameters, metadata} = result;

    const userInfo = await Slack.getUserInfo(message.user);
    console.log(userInfo);

    switch(metadata.intentName) {
        case 'Default Fallback Intent':
            return 'Sorry, whatever you just said to me is not supported; please ask Cameron what I can do.';
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
            const printDone = await PrintDone(userInfo);
            return printDone;
        case 'WhatIsPrinting':
            const whatIsPrinting = await WhatIsPrinting();
            return whatIsPrinting;
        case 'PrintStarted':
            return '';
    } 
}