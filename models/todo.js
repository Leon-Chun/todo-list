const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default:false
  }
})

module.exports = mongoose.model('Todo',todoSchema)
//本來是 module.exports = Todo名稱 丟出資料
//這邊則使用了 mongoose.model 處理資料(使用todoSchema規格書)後才丟出Todo
//引用需寫 Todo = require('/models/todo.js') 才能引用。