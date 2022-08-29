const mongoose = require ('mongoose')
const config = require('./config')
const log4js = require("./log")
const logger = log4js.getLogger()

try {
    mongoose.connect(
        config.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true            
        })

} catch (error) {
    logger.error(error.message)
}
module.exports = mongoose;