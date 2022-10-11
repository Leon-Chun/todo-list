const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const methodOverride = require('method-override')
const routes = require('./routes')  //預設會去抓 index.js(總路由器)
const port = 3000
const app = express()


//database setting
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection    // 取得資料庫連線狀態
db.on('error', () => {                  // 連線異常
  console.log('mongodb error')
})
db.once('open', () => {                // 連線成功
  console.log('mongodb connected')
})


//express-handlebars setting
app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

//收到的網址處理
app.use(express.urlencoded({extended:true}))  //body  使用
app.use(methodOverride('_method'))            //method使用
app.use(routes)                               //路由使用，放最後


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
