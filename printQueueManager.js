const fs = require('fs');

class PrintQueueManager {
    constructor() {
        this.queue = [];

        if(!fs.existsSync('./print_queue.json')) {
            fs.writeFileSync('./print_queue.json', '[]');
        } else {
            this.queue = JSON.parse(fs.readFileSync('./print_queue.json').toString());
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

        const result = this.splice(0, 1)[0];
        this.save();
        return result;
    }

    getQueue() {
        return this.queue;
    }

    save() {
        fs.writeFileSync('./print_queue.json', JSON.stringify(this.queue, null, 4));
    }
}

module.exports = new PrintQueueManager;