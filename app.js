const express = require('express')
const app = express()
// const exphbs = require('express-handlebars')
// const mongoose = require('mongoose')

const port = 3000

//handlebars setting
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// app.set('view engine', 'handlebars')


//database setting
// mongoose.connect('mongodb://localhost/restaurant-list')
// const db = mongoose.connection    // 取得資料庫連線狀態
// db.on('error', () => {                  // 連線異常
//   console.log('mongodb error')
// })
// db.once('open', () => {                // 連線成功
//   console.log('mongodb connected')
// })


//router setting
app.get('/', (req, res) => {
  res.send('This is my movie list')
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

