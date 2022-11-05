//外部套件
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT

//自己設定的引用的項目
const routes = require('./routes')  //預設會去抓 index.js(總路由器)
require('./config/mongoose')

const usePassport = require('./config/passport')



//使用套件後，產生的東西
const app = express()

//express-handlebars setting
app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

//收到的網址處理
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:true
}))
app.use(express.urlencoded({extended:true}))  //body  使用
app.use(methodOverride('_method'))            //method使用

usePassport(app)

app.use(flash())
app.use((req,res,next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user //這邊req的user是在passport.js 的反序列化那邊，丟的。
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next() //有放next參數，這個呼叫就先寫上
})

app.use(routes)    //路由使用，放最後


app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
