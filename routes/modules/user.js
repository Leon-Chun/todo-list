const express = require('express')
const router = express.Router() // 啟動路由器功能
const Users = require('../../models/users')

router.get('/login',(req,res) => {
  res.render('login')
})

router.get('/register',(req,res) => {
  res.render('register')
})

router.post('/login', (req, res) => {
  res.render('index')
})

router.post('/register',(req,res) => {
  //結構付值
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


  // Users.create({
  //         name,
  //         email,
  //         password
          
  //       })
  //       .then(() => res.render(''))
  //       .catch(err => console.log(err))




})


module.exports = router