const loki = require('lokijs');
const log = require('../core/logger');
const dbUser = new loki('dbUser.json');
const dbIntent = new loki('dbIntent.json');

const addUser = (rut, company, bu) => {
    try {
        const collection = dbUser.addCollection('user');
        const user = collection.findOne({ rut: rut });
        let insert = false;
        if (!user) {
            insert = true;
        }

        if (insert) {
            collection.insert([{ rut, company, bu }]);
        } else {
            user.company = company;
            user.bu = bu;
            collection.update(user);
        }
        dbUser.saveDatabase();

        return true;
    } catch (e) {
        log.error(`Error adding ${rut}: ${e}`);
        return false;
    }
};

const deleteUser = (rut) => {
    try {
        const collection = dbUser.addCollection('user');
        collection.findAndRemove({ rut: rut });
        dbUser.saveDatabase();

        return true;
    } catch (e) {
        log.error(`Error deleting ${rut}: ${e}`);
        return false;
    }
};

const findUser = (rut) => {
    try {
        const collection = dbUser.addCollection('user');
        const user = collection.findOne({ rut: rut });
        return user;
    } catch (e) {
        log.error(`Error finding user ${rut}: ${e}`);
        return null;
    }
};

const addIntent = (bu, text, response) => {
    try {
        const collection = dbIntent.addCollection('intent');
        const intent = collection.findOne({ bu: bu, text: text });
        let insert = false;
        if (!intent) {
            insert = true;
        }

        if (insert) {
            collection.insert([{ bu, text, response }]);
        } else {
            intent.response = response;
            collection.update(intent);
        }
        dbIntent.saveDatabase();

        return true;
    } catch (e) {
        log.error(`Error adding ${bu}/${text}: ${e}`);
        return false;
    }
};

const deleteIntent = (bu, text) => {
    try {
        const collection = dbIntent.addCollection('intent');
        collection.findAndRemove({ bu: bu, text: text });
        dbIntent.saveDatabase();

        return true;
    } catch (e) {
        log.error(`Error deleting ${bu}/${text}: ${e}`);
        return false;
    }
};

const findIntent = (bu, text) => {
    try {
        const collection = dbIntent.addCollection('intent');
        const intent = collection.findOne({ bu: bu, text: text });
        return intent;
    } catch (e) {
        log.error(`Error finding intent ${bu}/${text}: ${e}`);
        return null;
    }
};

const clearCollection = (name) => {
    try {
        let collection;
        let response = true;
        switch (name) {
            case 'user':
                collection = dbUser.addCollection(name);
                collection.removeDataOnly();
                dbUser.saveDatabase();
                break;
            case 'intent':
                collection = dbIntent.addCollection(name);
                collection.removeDataOnly();
                dbIntent.saveDatabase();
                break;
            default:
                response = false;
                break;
        }

        return response;
    } catch (e) {
        log.error(`Error deleting collection ${name}: ${e}`);
        return false;
    }
};

module.exports = {
    addUser,
    deleteUser,
    findUser,
    addIntent,
    deleteIntent,
    findIntent,
    clearCollection,
};
