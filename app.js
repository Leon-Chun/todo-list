const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const port = 3000
const app = express()




//database setting
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection    // 取得資料庫連線狀態
db.on('error', () => {                  // 連線異常
  console.log('mongodb error')
})
db.once('open', () => {                // 連線成功
  console.log('mongodb connected')
})

//express-handlebars setting
app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(express.urlencoded({extended:true}))

//router setting
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index',{todos}))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req,res) =>{
  return res.render('new')
})

//to detail page
app.get('/todos/:id',(req,res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail',{ todo }))
    .catch(error => console.log(error))
})

//to edit page
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//after edit
app.post('/todos/:id/edit',(req,res) => {
  const id = req.params.id
  //因為是要修改，要存user修改的內容
  const name = req.body.name
  return Todo.findById(id)
    .then(todo => {
      todo.name = name // 這段是重新賦值
      return todo.save()  //這邊不能用lean()，不然todo會變成單純資料，無法用save()功能
    } )
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
}) 

//new todo
app.post('/todos', (req,res)=>{
  //先拿出user的輸入值
  const name = req.body.name
  //再來新建 todo 使用寫好schema原則的Todo,
  const todo = new Todo({
    name
    //會等同 name : name 寫法
  })

  //上面這段只存在聯覽器，接下來要送入 資料庫，使用save()
  return todo.save()
    .then(() => res.redirect('/'))
    .catch( error => console.log(error) )
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
