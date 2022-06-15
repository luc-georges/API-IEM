const expressLoader = require('./express')
const mongooseLoader = require('./mongoose')

module.exports = async ({ expressApp }) => {
    await mongooseLoader.connect();
    console.log('MongoDB Initialized');
    await expressLoader({ app: expressApp });
    console.log('Express Initialized');

}