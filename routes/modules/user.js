const express = require('express')
const router = express.Router() // 啟動路由器功能
const Users = require('../../models/users')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login',(req,res) => {
  res.render('login')
})

router.get('/register',(req,res) => {
  res.render('register')
})

router.post('/login', passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: 'users/login'
}))

router.post('/register',(req,res) => {
  //結構賦值
  const { name,email,password,confirmPassword } = req.body
  const errors = []

  if(!name || !email || !password || !confirmPassword){
    errors.push({message: '所有欄位都是必填'})
  }
  if(password !== confirmPassword){
    errors.push({message: '密碼與確認密碼不符'})
  }
  
  if(errors.length){
    return res.render('register',{
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  Users.findOne({email})
    .then(data => {
    if(data){
      errors.push({message: '此信箱已註冊過'})
      return res.render('register',{
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }

    return bcrypt
      .genSalt(10)  //run數
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => Users.create({
      name,
      email,
      password: hash
    }))

    
      .then(res.redirect('/'))
      .catch(err => console.log(err))
    })
})

router.get('/logout',(req,res) => {  //新版本passport不能用get 
  req.logout(() => {
    req.flash('success_msg','你已經成功登出。')
  res.redirect('/users/login')
  })
})

module.exports = router