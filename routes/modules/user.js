const express = require('express')
const router = express.Router() // 啟動路由器功能
const Users = require('../../models/users')
const passport = require('passport')

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

  Users.findOne({email})
       .then(data => {
        if(data){
          res.render('register',{
            name,
            email
          })
        }else{
          Users.create({
            name,
            email,
            password
          })
            .then(res.redirect('/'))
            .catch(err => console.log(err))
        }
       })
})

router.get('/logout',(req,res) => {  //新版本passport不能用get 
  req.logout()
  res.redirect('/users/login')
})

module.exports = router