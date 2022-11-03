const { urlencoded } = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/users')

module.exports = app => {
  //passport初始化
  app.use(passport.initialize())
  app.use(passport.session())

  //strategy設定
  //email當唯一值的。後面是用來做驗證的function，裡面是使用者輸入的email password，用done來傳出
  passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done) => {
    User.findOne({email})
      .then(user => {
        if(!user){
          return done(null,false,{message:'That email is not registered'})
          // null 是沒異常的意思，後面則是沒找到user
        }
        if(user.password !== password){
          return done(null,false,{message:'Email or Password incorrect'})
        }
        return done(null, user)
      })
      .catch(err => done(err,false))  //注意跟mongoose提供寫法不同
  }))  
 
  //session設定，使用序列反序列。
  passport.serializeUser((user,done) => {
    done(null,user.id)  //這邊 ._id 也可以
  })
  passport.deserializeUser((id,done) => {
    User.findById(id)
      .lean()
      .then(user => done(null,user))
      .catch(err => done(err,false))
  })
}