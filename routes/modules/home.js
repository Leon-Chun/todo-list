const express = require('express')
const router = express.Router() // 啟動路由器功能
const Todo = require('../../models/todo') //資料庫資料

router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ name: 'asc' }) //desc 反序
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

module.exports = router
//這邊 exports 出去後，會丟到 index.js(總路由器)彙整
//結論， 引用routes下的 home.js 會丟出資料庫內首頁資料，通常是總路由引用
//總路由、收到什麼網址請求，就丟出什麼檔案