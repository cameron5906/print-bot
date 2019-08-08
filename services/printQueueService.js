const fs = require('fs');

class PrintQueueManager {
    constructor() {
        this.queue = [];
        this.currentPrint = null;

        if(!fs.existsSync('./print_queue.json')) {
            fs.writeFileSync('./print_queue.json', '[]');
        } else {
            this.queue = JSON.parse(fs.readFileSync('./print_queue.json').toString());
        }

        if(fs.existsSync('./current_print.json')) {
            this.currentPrint = JSON.parse(fs.readFileSync('./current_print.json').toString());
        }
    }

    addToQueue(userId, userName, url, thingName, thingImageUrl, thingCategory) {
        this.queue.push({
            userId,
            userName,
            url,
            thingName,
            thingImageUrl,
            thingCategory
        });
        this.save();
    }

    removeFromQueue(userId) {
        this.queue = this.queue.filter(p => p.userId !== userId);
        this.save();
    }

    getNextInQueue() {
        if(this.queue.length === 0) return false;

        const result = this.queue.splice(0, 1)[0];
        this.save();
        return result;
    }

    getQueue() {
        return this.queue;
    }

    setCurrentPrint(info) {
        this.currentPrint = info;
        fs.writeFileSync('./current_print.json', JSON.stringify(this.currentPrint, null, 4));
    }

    removeCurrentPrint() {
        this.currentPrint = null;
        fs.unlinkSync('./current_print.json');
    }

    getCurrentPrint() {
        return this.currentPrint;
    }

    save() {
        fs.writeFileSync('./print_queue.json', JSON.stringify(this.queue, null, 4));
    }
}

module.exports = new PrintQueueManager;