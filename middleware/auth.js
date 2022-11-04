module.exports = {   //做一個物件
  //後面{} 是express的 middleware，所以參數要有 req,res,next
  authenticator: (req,res,next) => {   //next 有呼叫next()才會執行下一個funtion
    if (req.isAuthenticated()) {   //isAuthenticated() passport給的屬性
      return next()
    }
    res.redirect('/users/login')
  }
}