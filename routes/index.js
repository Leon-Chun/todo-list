const express = require('express')
const router = express.Router()

//底下小路由們
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/user')

//請求 與 對應小路由
router.use('/',home)  
router.use('/todos',todos)
router.use('/users', users)  


module.exports = router
//依照收到的網址請求，總路由丟出相應檔案過去
//意思總路由有全檔案路線，而個別資料引用則寫在各路由設定下。