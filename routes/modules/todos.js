const express = require('express')
const router = express.Router() // 啟動路由器功能
const Todo = require('../../models/todo') //資料庫資料

//to add new page
router.get('/new', (req, res) => {
  return res.render('new')
})


//to detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//to edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//add new todo
router.post('/', (req, res) => {
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
    .catch(error => console.log(error))
})

//after edit
router.put('/:id', (req, res) => {
  const id = req.params.id
  //因為是要修改，要存user修改的內容
  const { name, isDone } = req.body

  return Todo.findById(id)
    .then(todo => {
      todo.name = name // 這段是重新賦值
      todo.isDone = isDone === 'on'
      //上面這段使用 運算式 = > < 的回傳true false
      // if(isDone === 'on'){ 
      //   todo.isDone = true
      // }else{
      //   todo.isDone = false
      // }
      return todo.save()  //這邊不能用lean()，不然todo會變成單純資料，無法用save()功能
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

//after delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router