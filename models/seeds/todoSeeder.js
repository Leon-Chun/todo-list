const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Todo = require('../todo')
const User = require('../users')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'root',
  email:'root@example.com',
  password : 'root'
}

db.once('open', () => {               
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password,salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id 
      return Promise.all(Array.from(  //Promise.all，會等內容都執行完，才執行下一個.then
        { length: 10 }, // ['','','','',.....10個]
        (_, i) => Todo.create({name:`name-${i}`, userId })
      ))
    })
    .then(() => {
      console.log('seed done')
      process.exit()
    })
})