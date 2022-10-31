const express = require('express')
const router = express.Router() // 啟動路由器功能

router.get('/login',(req,res) => {
  res.render('login')
})

module.exports = router