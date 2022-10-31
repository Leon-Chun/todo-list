const express = require('express')
const router = express.Router() // 啟動路由器功能

router.get('/login',(req,res) => {
  res.render('login')
})

router.get('/register',(req,res) => {
  res.render('register')
})

router.post('/login', (req, res) => {
  
})


module.exports = router