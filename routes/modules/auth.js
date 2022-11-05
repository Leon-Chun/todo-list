const express = require('express')
const router = express.Router() // 啟動路由器功能
const passport = require('passport')

router.get('/facebook', passport.authenticate('facebook',{
  //告訴fb，要跟使用者請求的資料
  scope: ['email','public_profile']
}))

router.get('/facebook/callback', passport.authenticate('facebook',{
  successRedirect: '/',
  failureRedirect: 'users/login'
}))

module.exports = router