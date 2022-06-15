const expressLoader = require('./express')
const mongooseLoader = require('./mongoose')

module.exports = async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Initialized');
  await expressLoader({ app: expressApp });
  console.log('Express Initialized');

}