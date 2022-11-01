const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type:String,
    required: true
  },
  createdAd: {
    type:Date,
    default: Date.now  //建立資料的時間點，Date.now() 會變成伺服器建立的時間
  }
})

module.exports = mongoose.model('User', userSchema)