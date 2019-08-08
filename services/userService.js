const SlackWeb = require('../wrappers/slack');
const users = require('../users.json');

class UserService {
    constructor() {
        this.userIdCache = {};
    }

    async getRole(userId) {
        const username = await this._getUsernameFromId(userId);
        const userInfo = users.find(u => u.username === username);

        if(!userInfo) return false;
        return userInfo.role;
    }

    getByRole(role) {
        return users.filter(u => u.role === role);
    }

    async isAllowed(userId) {
        const username = await this._getUsernameFromId(userId);

        return typeof(users.find(u => u.username === username)) !== 'undefined';
    }

    async _getUsernameFromId(userId) {
        if(this.userIdCache[userId]) return this.userIdCache[userId];
        const {username} = await SlackWeb.getUserInfo(userId);

        this.userIdCache[userId] = username;
        return username;
    }
}

module.exports = new UserService;