//外部套件
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const port = 3000

//自己設定的引用的項目
const routes = require('./routes')  //預設會去抓 index.js(總路由器)
require('./config/mongoose')

//使用套件後，產生的東西
const app = express()

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
