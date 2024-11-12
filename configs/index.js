const redis = require('./redis')
const email = require('./email')
const aws = require('./aws')



module.exports = { 
    ...redis,
    ...email,
    ...aws,
    port: process.env.PORT || 3000,
 }