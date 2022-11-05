const { urlencoded } = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/users')
const FacebookStrategy = require('passport-facebook').Strategy

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

        //密碼比對
        return bcrypt.compare(password, user.password)
        //password是使用者輸入，user.password是從資料庫拿出來的密碼，做比較
          .then(isMatch => {
            if(!isMatch){
          return done(null,false,{message:'Email or Password incorrect'})
        }

        return done(null, user)
          })        
      })
      .catch(err => done(err,false))  //注意跟mongoose提供寫法不同
  }))  

  passport.use(new FacebookStrategy({
    clientID: process.env.Facebook_ID,
    clientSecret: process.env.Facebook_SECRET,
    callbackURL: process.env.Facebook_CALLBACk,
    profileFields:['email','displayName']
  },
    (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json
      User.findOne({ email})
        .then(user => {
          if (user) return done(null, user)
          //如果email已經存在資料庫，則踢出使用者

          const randomPassword = Math.random().toString(36).slice(-8)
          //這裡36 代表 A~Z加上0~9。 -8指 只取後面8位數字。
          bcrypt
            .genSalt(10)  //run數
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then( user => done(null, user) )
            .catch(err => done(err, false))
        })
      
    }
  ));

 
  //session設定，使用序列反序列。
  passport.serializeUser((user,done) => {
    done(null,user.id)  //這邊 ._id 也可以m
  })
  passport.deserializeUser((id,done) => {
    User.findById(id)
      .lean()
      .then(user => done(null,user))
      .catch(err => done(err,false))
  })
}