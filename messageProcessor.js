const Dialogflow = require('./dialogflow');
const {
    ShowWebcam
} = require('./intents');

module.exports = async (message) => {
    const dialogflowResponse = await Dialogflow.process(message.user, message.text);
    const { result}  = dialogflowResponse;
    const { parameters, metadata} = result;

    switch(metadata.intentName) {
        case 'ShowWebcam':
            return ShowWebcam();
        case 'AddToQueue':
            return '';
        case 'CancelPrint':
            return '';
        case 'PrintDone':
            return '';
        case 'PrintStarted':
            return '';
    } 
}