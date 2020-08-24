const express = require('express')
const app = new express()


const ejs = require('ejs')
app.set('view engine', 'ejs')




const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw());
app.use(expressSession({
    secret: 'keyboard cat'
   }))


const homeController = require('./controllers/home')
const loginController = require('./controllers/login')
const newUserController = require('./controllers/newUser')



// const authMiddleware = require('./middleware/authMiddleware')
// const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

// const fileUpload = require('express-fileupload')
// app.use(fileUpload())



//Đăng ký thư mục public.....
app.use(express.static('public'))

// const customMiddleWare = (req, res, next) => {
//     console.log('Custom middle ware called')
//     next()
// }
// app.use(customMiddleWare)

// const validateMiddleware = require("./middleware/validationMiddleware");
// app.use('/posts/store', validateMiddleware)

//Tao server
app.listen(4000, () => {
    console.log('OK. App listening on port 4000')
})





app.get('/', homeController)

app.get('/login', loginController)

app.get('/newUser',newUserController)



