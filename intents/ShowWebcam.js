const request = require('request');
const Slack = require('../slack');
const SNAPSHOT_URL = 'http://localhost:8080/?action=snapshot';

module.exports = async (channelId) => {
    await Slack.uploadFile(channelId, request(SNAPSHOT_URL), 'Snapshot.jpg');
    return 'Here is the current view of the print';
}