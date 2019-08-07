const request = require('request');
const OCTO_API_KEY = process.env.OCTO_API_KEY;

class OctoPrint {
    async getState() {
        const jobInfo = await request(`http://127.0.0.1/api/job?apikey=${OCTO_API_KEY}`);
        const printerInfo = await request(`http://127.0.0.1/api/printer?apikey=${OCTO_API_KEY}`);

        const progress = jobInfo.progress;
        const {
            printTimeLeft,
            printTime
        } = progress;

        const flags = printerInfo.state.flags;
        const {
            cancelling,
            error,
            finishing,
            operational,
            paused,
            pausing,
            printing
        } = flags;

        const bedTemps = printerInfo.temperature.bed;
        const toolTemps = printerInfo.temperature.tool0;

        return {
            /*times*/
            estimatedTimeRemaining: printTimeLeft,
            currentPrintTime: printTime,
            /*temps*/
            bedTemperature: bedTemps.actual,
            bedTargetTemperature: bedTemps.target,
            toolTemperature: toolTemps.actual,
            toolTargetTemperature: toolTemps.target,
            /*flags*/
            cancelling,
            error,
            finishing,
            operational,
            paused,
            pausing,
            printing
        }
    }

    async uploadGCode(data) {
        await request.post({
            url: `http://127.0.0.1/api/files/local?key=${OCTO_API_KEY}`,
            formData: {
                file: data,
                select: 'true',
                print: 'true'
            }
        });
    }

    async stopPrint() {
        await request.post({
            url: `http://127.0.0.1/api/job`,
            body: {
                command: 'cancel'
            },
            json: true
        });
    }
}

module.exports = new OctoPrint;