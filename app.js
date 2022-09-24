const express = require('express')
const mongoose = require('mongoose')

const app = express()

const port = 3000

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


//database setting
const db = mongoose.connection    // 取得資料庫連線狀態
db.on('error', () => {                  // 連線異常
  console.log('mongodb error')
})
db.once('open', () => {                // 連線成功
  console.log('mongodb connected')
})


//router setting
app.get('/', (req, res) => {
  res.send('This is my movie list')
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
