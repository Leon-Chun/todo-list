const express = require('express')
const router = express.Router() // 啟動路由器功能
const Todo = require('../../models/todo') //資料庫資料

//to add new page
router.get('/new', (req, res) => {
  return res.render('new')
})


//to detail page
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({_id,userId})
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//to edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//add new todo
router.post('/', (req, res) => {
  const name = req.body.name
  const userId = req.user._id
 
  return Todo.create({name, userId})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//after edit
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  //因為是要修改，要存user修改的內容
  const { name, isDone } = req.body

  return Todo.findOne({ _id, userId })
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
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})

//after delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router